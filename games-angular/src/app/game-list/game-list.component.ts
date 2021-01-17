import { Component, OnInit } from '@angular/core';
import { Game } from '../service/games';
import { GamesService } from '../service/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: Game[];
  
  constructor(private gs: GamesService) { 
    this.games = [];
  }

  ngOnInit(): void {
    this.gs.getAllGamesCouchDB().subscribe(data =>{
      for (let index = 0; index < data.length; index++) {
        let game = new Game(
          Object.create(data[index]).value.name,
          Object.create(data[index]).value.description,
          Object.create(data[index]).value.price,
          Object.create(data[index]).value._id)
        game.set_rev(Object.create(data[index]).value._rev)
        this.games.push(game)
      }
      console.log(this.games)
    })

    // this.gs.getAllGames().subscribe(data =>{
    //   console.log(data);
    //   this.games = data;
    // }, err => {
    //   console.log(err);
    // });

  }
}
