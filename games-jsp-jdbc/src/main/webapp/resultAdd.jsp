<%@ page language="java" contentType="text/html; charset=UTF-8" 
    pageEncoding="UTF-8" %>
<!DOCTYPE html>
<%@ page import="edu.ap.rdp.*" %>
<%@ page import="java.util.ArrayList" %>
<%
JDBConnection connection = null;

try{
    //exctract values from post
    String name = request.getParameter("name");
    String description = request.getParameter("description");
    Double price = Double.parseDouble(request.getParameter("price"));

    //open connection and insert values
    connection = JDBConnection.getJDBConnection();
    connection.openConnection("gamesDB","root","root");
    String insertSQL = "INSERT INTO games(name, description, price) VALUES('" + name + "','" + description + "'," + price + ");";
    connection.executeInsert(insertSQL);

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
    <h1>Creating new game...</h1>
</body>

</html>