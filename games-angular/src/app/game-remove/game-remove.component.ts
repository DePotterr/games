import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../service/games.service';

@Component({
  selector: 'app-game-remove',
  templateUrl: './game-remove.component.html',
  styleUrls: ['./game-remove.component.css']
})
export class GameRemoveComponent implements OnInit {
  gameName : string
  private gameID: string
  private gameRev: string
  game = this.fb.group({
    name: ['', Validators.required]
  })
  constructor(private gs: GamesService, private fb: FormBuilder, private activeroute: ActivatedRoute) {
    this.activeroute.params.subscribe(
      params =>{
        this.gameName = params['name']
        this.game.controls['name'].setValue(this.gameName)
      }
    )
  }

  onSubmit(){
    this.gs.removeGameCouchDB(this.gameID,this.gameRev)
  }

  ngOnInit() {
    this.searchGame(this.gameName)
  }

  searchGame(gameName: string){
    this.gs.searchOneGameCouchDB(gameName).subscribe( data =>{
      console.log(data)
     this.gameID = Object.create(data)._id
     this.gameRev = Object.create(data)._rev
    })
  }
}
