import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ListGames from './games/ListGames'
import './App.css'
import AddGame from './games/AddGame'
import SearchGame from './games/SearchGame'
import DeleteGame from './games/DeleteGame'
import EditGame from './games/EditGame'
class App extends Component {

  render() {
    return (
        <div id="app" className = 'container'>
          <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="/">Game App</a>
            <button id="hamburgerBtn" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                 <a id="test" class="nav-link" href="/">List</a>
              </li>
              <li class="nav-item">
                 <a id="navAdd" class="nav-link" href="/add">Add</a>
              </li>
              <li class="nav-item">
                 <a id="navSearch" class="nav-link" href="/search">Search</a>
              </li>
              <li class="nav-item">
                 <a id="navDelete" class="nav-link" href="/delete">Delete</a>
              </li>
            </ul>
          </div>
          </nav>
          </header>
        <BrowserRouter>
            <Switch>
              <Route exact path='/list'><ListGames/></Route>
              <Route exact path='/search'><SearchGame/></Route>
              <Route path='/delete/:game' component={ DeleteGame } />
              <Route path='/delete'><DeleteGame/></Route>
              <Route path='/edit/:game' component={ EditGame }/>
              <Route path='/add'><AddGame/></Route>
              <Route path='*'><ListGames/></Route>
            </Switch>  
        </BrowserRouter>
        </div> 
      )
    }
  }
  
  export default App
