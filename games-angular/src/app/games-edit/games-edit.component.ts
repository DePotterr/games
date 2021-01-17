import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../service/games';
import { GamesService } from '../service/games.service';

@Component({
  selector: 'app-games-edit',
  templateUrl: './games-edit.component.html',
  styleUrls: ['./games-edit.component.css']
})
export class GamesEditComponent implements OnInit {
  gameName: string
  gameID: string
  gameRev: string
  game = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required]
  })
  constructor(private gs: GamesService, private fb: FormBuilder, private router: Router, private activeroute: ActivatedRoute) {
    this.activeroute.params.subscribe(
      params => { this.gameName = params['name']; this.gs.searchOneGameCouchDB(this.gameName).subscribe(
        data => {this.game.controls['name'].setValue(Object.create(data).name)
                this.game.controls['description'].setValue(Object.create(data).description)
                this.game.controls['price'].setValue(Object.create(data).price)
                this.gameID = Object.create(data)._id
                this.gameRev = Object.create(data)._rev
              }, err =>{ console.log(err)}
      )}
    )
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.gs.editGameCouchDB( new Game(this.game.value.name,this.game.value.description,this.game.value.price, this.gameID, this.gameRev))
  }
}
