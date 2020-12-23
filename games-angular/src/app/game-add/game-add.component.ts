import { Component } from '@angular/core';
import { GamesService } from '../service/games.service';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from '../service/games';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent {

  game = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required]
  })

  constructor(private gs: GamesService, private fb: FormBuilder, private router: Router) { }

  onSubmit(){
    this.gs.addGame( new Game(
      this.game.value.name,
      this.game.value.description,
      this.game.value.price
    ));
    this.router.navigate(['']);
  }

}
