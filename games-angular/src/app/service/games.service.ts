import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from './games';

@Injectable()
export class GamesService {

   private gamesServiceURI: string = 'http://localhost:3000/games';
   private contentHeaders: HttpHeaders;

   constructor(private http: HttpClient) {
      this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
   }

   // Get all games
   getAllGames(): Observable<Game[]> {
      let url = this.gamesServiceURI;
      return this.http.get<Game[]>(url);
   }

   // Add a game to DB
   addGame(game : Game): void{
      this.http.post(this.gamesServiceURI + '/add', game.getParamsWithoutId(), { headers: this.contentHeaders }).subscribe(
         data =>{
            console.log(data);
         },
         err =>{
            console.log(err);
         }
      );
   }
}
