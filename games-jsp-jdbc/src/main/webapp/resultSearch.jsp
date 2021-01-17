<%@ page language="java" contentType="text/html; charset=UTF-8" 
    pageEncoding="UTF-8" %>
<!DOCTYPE html>
<%@ page import="edu.ap.rdp.*" %>
<%@ page import="java.util.ArrayList" %>
<%
JDBConnection connection = null;
ArrayList<Game> games = null;

try{
    String name = request.getParameter("name");

    connection = JDBConnection.getJDBConnection();
    connection.openConnection("gamesDB","root","root");
    String selectSQL= "SELECT * FROM games WHERE name LIKE '%" + name + "%'";
    games = connection.executeSelect(selectSQL);
}
catch(Exception e){
    System.out.println(e);
}
finally{
    connection.closeConnection();
}

%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Found Games</title>
</head>
<body>
<h2>Results</h2>
    <table>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
        </tr>
    <%
        int count = 0;
        if(games.size() > 0){
            for(Game g: games){
                out.println("<tr><td><a href='edit.jsp?id=" + g.getIdGame() + "'>" + g.getName() + "</a></td><td>" + g.getDescription() + "</td><td id='grade" + count + "'>" + g.getPrice() + "</td></tr>");
                count++;
            }
        }
    %>
    </table>
</body>
</html>