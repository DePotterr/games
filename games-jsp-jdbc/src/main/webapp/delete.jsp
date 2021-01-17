<%@ page language="java" contentType="text/html; charset=UTF-8" 
    pageEncoding="UTF-8" %>
<!DOCTYPE html>
<%@ page import="edu.ap.rdp.*" %>
<%@ page import="java.util.ArrayList" %>
<%
JDBConnection connection = null;

try{
    //exctract values from post
    int idGame = Integer.parseInt(request.getParameter("idGame"));

    //open connection and insert values
    connection = JDBConnection.getJDBConnection();
    connection.openConnection("gamesDB","root","root");
    String deleteSQL = "delete from games where idGame = " + idGame + ";";
    connection.executeInsert(deleteSQL);

    response.sendRedirect("index.jsp");
}
catch(Exception e){
    System.out.println(e);
}
finally{
    connection.closeConnection();
}
%>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete</title>
</head>

<body>
    <h1>Deleting student...</h1>
</body>

</html>