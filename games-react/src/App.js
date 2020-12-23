import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ListGames from './games/ListGames'

class App extends Component {

  render() {
    return (
        <div className = 'container'>
          <header>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="">Game App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                 <a id="test" class="nav-link" href="/">List</a>
              </li>
            </ul>
          </div>
          </nav>
          </header>
        <BrowserRouter>
            <Switch>
              <Route exact path='/list'><ListGames/></Route>
              <Route path='*'><ListGames/></Route>
            </Switch>  
        </BrowserRouter>
        </div> 
      )
    }
  }
  
  export default App
