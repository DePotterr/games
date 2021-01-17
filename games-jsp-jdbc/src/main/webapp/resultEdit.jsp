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
    String name = request.getParameter("name");
    String description = request.getParameter("description");
    Double price = Double.parseDouble(request.getParameter("price"));

    //open connection and insert values
    connection = JDBConnection.getJDBConnection();
    connection.openConnection("gamesDB","root","root");
    String updateSQL = "UPDATE games SET name = '" + name + "', description = '" + description + "', price = " + price + " WHERE idGame = " + idGame +";";
    connection.executeInsert(updateSQL);

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
    <title>Result</title>
</head>

<body>
    <h1>Editing Game...</h1>
</body>

</html>