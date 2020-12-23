import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'games-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'games-angular';
  author = '';
  names = ['Robin','Dirk','Paljas','Gregory','Karolien'];

  ngOnInit(): void {
    var randomNumber  = Math.floor(Math.random() * this.names.length);
    console.log(randomNumber)
    this.author = this.names[randomNumber];
  }
}
