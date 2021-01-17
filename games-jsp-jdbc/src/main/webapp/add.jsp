<%@ page language="java" contentType="text/html; charset=UTF-8" 
    pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game</title>
</head>

<body>
    <form class="newGame" action="resultAdd.jsp" method="POST">
        <input type="text" name="name" placeholder="Name">
        <input type="text" name="description" placeholder="Description">
        <input type="text" name="price" placeholder="Price">
        <button type="submit">Add</button>
    </form>
    <a href="index.jsp">Ga naar lijst</a>
</body>

</html>