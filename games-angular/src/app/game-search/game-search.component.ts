import { Component, OnInit } from '@angular/core';
import { Game } from '../service/games';
import { GamesService } from '../service/games.service';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css']
})
export class GameSearchComponent implements OnInit {

  games: Game[];
  foundGames: Game[];
  searchGameForm = this.fb.group({
    name: ['', Validators.required]
 });

  constructor(private gs: GamesService, private fb: FormBuilder) {
    // Dit wordt gedaan omdat men anders niks kan toevoegen
    this.games = []
    this.foundGames = []
  }

  ngOnInit(): void {
    this.getGames()
  }

  modelChanged(searchInput) {
    console.log(searchInput)
    //this.searchAllGames(searchInput)
    //this.searchAllGamesOnBackendArray(searchInput)
    this.searchAllGamesOnComponent(searchInput)
  }
  // Get all games
  // 1ste is CouchDB dit is een iets moeilijkere constructie omdat de data die we terug krijgen niet gelijk is aan een game object.
  // Daarom moeten we het eerst converteren.
  getGames(){
    this.gs.getAllGamesCouchDB().subscribe(data =>{
      for (let index = 0; index < data.length; index++) {
        let game = new Game(
          Object.create(data[index]).value.name,
          Object.create(data[index]).value.description,
          Object.create(data[index]).value.price,
          Object.create(data[index]).value._id)
        this.games.push(game)
      }
      this.foundGames = this.games;
      console.log(this.foundGames)
    })

    // this.gs.getAllGames().subscribe(
    //   data => {
    //     this.games = data;
    //     this.foundGames = this.games;
    //     console.log(data);
    //   }
    // )
  }
  // Search game on DB
  searchAllGames(gameName: string){

    this.gs.searchGameCouchDB(gameName).subscribe(
      data =>{
        this.foundGames = []
        for (let index = 0; index < data.length; index++) {
          let game = new Game(
            Object.create(data[index]).name,
            Object.create(data[index]).description,
            Object.create(data[index]).price,
            Object.create(data[index])._id)
          this.foundGames.push(game)
        }
        console.log(this.foundGames)
      }
    )

    // this.gs.searchGame(gameName).subscribe(
    // data => { 
    //           this.games = data;
    //           this.foundGames = this.games;
    //           console.log(data);
    //         }, 
    // error => { console.error(error) });
  }
  // Search game on Backend
  searchAllGamesOnBackendArray(gameName: string){
    // CouchDB
    this.gs.searchGameOnArrayCouchDB(gameName).subscribe(data => {
      this.foundGames = []
      console.log(data)
      for (let index = 0; index < data.length; index++) {
        let game = new Game(
          Object.create(data[index]).value.name,
          Object.create(data[index]).value.description,
          Object.create(data[index]).value.price,
          Object.create(data[index]).value._id)
        this.foundGames.push(game)
      }
    })
    // MongoDB
    // this.gs.searchGameOnArray(gameName).subscribe(data => { this.games = data; console.log(data); }, 
    // error => { console.error(error) });
  }
  // Search game in component
  // Deze functie werkt voor couchDB en mongoDB
  searchAllGamesOnComponent(gameName: string){
    var regex = new RegExp('^' + gameName, "i")
    this.foundGames = []
    for (let index = 0; index < this.games.length; index++) {
        if(regex.test(this.games[index].name)){
            this.foundGames.push(this.games[index])
        }
    }
  }
}
