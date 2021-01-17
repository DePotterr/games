import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameListComponent } from './game-list/game-list.component';
import { GamesService } from './service/games.service';
import { GameAddComponent } from './game-add/game-add.component';
import { GameSearchComponent } from './game-search/game-search.component';
import { GameRemoveComponent } from './game-remove/game-remove.component';
import { GamesEditComponent } from './games-edit/games-edit.component';

const appRoutes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'add', component: GameAddComponent },
  { path: 'search', component: GameSearchComponent},
  { path: 'remove', component: GameRemoveComponent},
  { path: 'remove/:name', component: GameRemoveComponent},
  { path: 'edit/:name', component: GamesEditComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameAddComponent,
    GameSearchComponent,
    GameRemoveComponent,
    GamesEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    GamesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
