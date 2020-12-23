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
  
  constructor(private gs: GamesService) { }

  ngOnInit(): void {
    this.gs.getAllGames().subscribe(data =>{
      console.log(data);
      for(var i = 0; i < data.length; i++){
        let number = Number.parseInt(data[i].price.toString()) + 1;
        data[i].price = number;
      }
      this.games = data;
    }, err => {
      console.log(err);
    });
  }
}
