import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Game } from './games';
import { Router } from '@angular/router';

@Injectable()
export class GamesService {

   private gamesServiceURI: string = 'http://localhost:3000/games';
   private contentHeaders: HttpHeaders;

   constructor(private http: HttpClient, private router: Router) {
      this.contentHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
   }

   // Get all games
   getAllGames(): Observable<Game[]> {
      return this.http.get<Game[]>(this.gamesServiceURI);
   }

   // Get all games on couchDB
   getAllGamesCouchDB(): Observable<[]>{
      return this.http.get<[]>(this.gamesServiceURI);
   }

   // Add a game to DB (MongoDB and CouchDB)
   addGame(game : Game): void{
      this.http.post(this.gamesServiceURI + '/add', game.getParamsWithoutId(), { headers: this.contentHeaders }).subscribe(
         data =>{
            console.log(data);
            this.router.navigate(['']);
         },
         err =>{
            console.log(err);
         }
      );
   }

   // Edit game
   editGame(game : Game): void{
      this.http.post(this.gamesServiceURI + '/edit', game.getParamsWithoutId(), { headers: this.contentHeaders }).subscribe(
         data =>{
            console.log(data);
            this.router.navigate(['']);
         },
         err =>{
            console.log(err);
         }
      )
   }

   // Edit game CouchDB
   editGameCouchDB(game : Game): void{
      this.http.post(this.gamesServiceURI + '/edit', game.getParamsCouchDB(), { headers: this.contentHeaders }).subscribe(
         data =>{
            console.log(data);
            this.router.navigate(['']);
         },
         err =>{
            console.log(err);
         }
      )
   }

   // Search all games by name on MongoDB
   searchGame(name: string): Observable<Game[]> {
      let url = `${this.gamesServiceURI}/searchAll`

      let data = this.http.post<Game[]>(url, `name=${name}`,
                    { headers: this.contentHeaders })
      console.log(data);
      return data;
   }

   // Search all games by name on CouchDB
   searchGameCouchDB(name: string): Observable<[]>{
      let url = `${this.gamesServiceURI}/searchAll`
      return this.http.post<[]>(url, `name=${name}`, { headers: this.contentHeaders })
   }

   // Search game on backend array
   searchGameOnArray(name: string): Observable<Game[]> {
      let url = `${this.gamesServiceURI}/searchOnArray`

      let data = this.http.post<Game[]>(url, `name=${name}`,
                    { headers: this.contentHeaders })
      console.log(data);
      return data;
   }

   // Search game on backend array CouchDB
   searchGameOnArrayCouchDB(name: string): Observable<[]> {
      let url = `${this.gamesServiceURI}/searchOnArray`

      let data = this.http.post<[]>(url, `name=${name}`,
                    { headers: this.contentHeaders })
      console.log(data);
      return data;
   }

   // Search Only 1 game
   searchOneGame(name: string): Observable<Game> {
      let url = `${this.gamesServiceURI}/searchOne`
      return this.http.post<Game>(url, `name=${name}`, { headers: this.contentHeaders })
   }

   searchOneGameCouchDB(name: string): Observable<JSON> {
      let url = `${this.gamesServiceURI}/searchOne`
      return this.http.post<JSON>(url, `name=${name}`, { headers: this.contentHeaders })
   }


   // Remove game on MongoDB
   removeGame(name: string){
      let url = `${this.gamesServiceURI}/delete/${name}`

      this.http.delete(url ,{ headers: this.contentHeaders }).subscribe( 
      data => {
         console.log(data)
         this.router.navigate([''])
      }, 
      err => {
         console.log(err)
      })

   }

   // Remove game on CouchDB
   removeGameCouchDB(_id: string, _rev: string){
      let url = `${this.gamesServiceURI}/delete`
      
      this.http.post(url, new HttpParams().set('_id', _id).set('_rev', _rev) ,{ headers: this.contentHeaders }).subscribe( 
      data => {
         console.log(data)
         this.router.navigate([''])
      }, 
      err => {
         console.log(err)
      })

   }
}