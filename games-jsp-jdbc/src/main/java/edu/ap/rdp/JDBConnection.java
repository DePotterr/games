package edu.ap.rdp;

import java.sql.*;
import java.util.ArrayList;

public class JDBConnection{
    private static JDBConnection instance = null;
    private Connection conn = null;

    private JDBConnection(){
        System.out.println("Instantiated");
    }

    public static synchronized JDBConnection getJDBConnection(){
        if(instance == null){
            instance = new JDBConnection();
        }
        return instance;
    }

    public void openConnection(String db, String user, String pwd){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            String url = "jdbc:mysql://127.0.0.1/" + db + "?serverTimezone=UTC";
            conn = DriverManager.getConnection(url,user,pwd);
            System.out.println("Connection opened.");
        }
        catch(Exception e){
            System.out.println(e);
        }
    }

    public void closeConnection(){
        try{
            conn.close();
            System.out.println("Connection closed.");
        }
        catch(Exception e){
            System.out.println(e);
        }
    }

    public void executeInsert(String sql){
        try{
            Statement stmt = conn.createStatement();
            stmt.executeUpdate(sql);
            stmt.close();
        }
        catch(SQLException ex){
            System.out.println(ex);
        }
    }

    public ArrayList<Game> executeSelect(String sql){
        ResultSet rs = null;
        ArrayList<Game> result = new ArrayList<Game>();
        try{
            Statement stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            while(rs.next()){
                result.add(new Game(rs.getInt("idGame"), rs.getString("name"), rs.getString("description"),rs.getDouble("price")));
            }
            stmt.close();
        }
        catch(SQLException ex){
            System.out.println(ex);
        }
        return result;
    }
}