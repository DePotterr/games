package edu.ap.rdp;

public class Game{
    private int idGame;
    private String name;
    private String description;
    private Double price;

    Game(int idGame, String name, String description, Double price){
        this.idGame = idGame;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public int getIdGame() {
        return idGame;
    }

    public void setIdGame(int idGame) {
        this.idGame = idGame;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}