<%@ page language="java" contentType="text/html; charset=UTF-8" 
    pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<%@ page import="edu.ap.rdp.*" %>
<%@ page import="java.util.ArrayList" %>
<%
JDBConnection connection = null;
ArrayList<Game> games = null;
Game game  = null;
int id = Integer.parseInt(request.getParameter("id"));

try{
    connection = JDBConnection.getJDBConnection();
    connection.openConnection("gamesDB","root","root");
    String selectSQL = "SELECT * FROM games WHERE idGame = " + id + ";";
    games = connection.executeSelect(selectSQL);
    game = games.get(0);
}
catch(Exception e){
    System.out.println(e);
}
finally{
    connection.closeConnection();
}
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit</title>
</head>

<body>
    <h1>Game</h1>
        <form id="edit" method="POST" action="resultEdit.jsp"  onsubmit="return confirm('Ben je zeker om dit aan te passen?');">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
                <%
                    out.println("<tr><td><input type='hidden' name='idGame' value='" + game.getIdGame() + "'></input><input name='name' value='" + game.getName() + "'></input></td><td><input name='description' value='" + game.getDescription() + "'></input></td><td><input name='price' value='" + game.getPrice() + "'></input></td></tr>");
                %>
            </table>
        </form>
    
        <form id="delete" method="POST" action="delete.jsp"  onsubmit="return confirm('Ben je zeker dat je deze student wilt verwijderen?');">
            <%
                out.println("<input type='hidden' name='idGame' value='" + game.getIdGame() + "'></input>;");
            %>
        <form>
    <button type="submit" form="edit">Edit</button>
    <button type="submit" form="delete">Delete</button>
    <a class="button" href="./list.jsp">Ga terug</a>
</body>

</html>