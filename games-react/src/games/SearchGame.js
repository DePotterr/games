import React, { Component } from 'react'
import axios from 'axios'
import TableRow from './TableRow'
import $ from 'jquery'
import '../styles/style.css'
export default class SearchGame extends Component{
    
    exampleSearchTerms = ["Fortnite","GTA","Rocket League","FIFA","Minecraft","Cyberpunk 2077","Counter Strike"]
    constructor(props) {  
        super(props)
        this.state = { games: [] }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        $('#navSearch').addClass('active')
        
        axios.get("http://localhost:3002/games").then( response => {
            this.setState( { games: response.data } )
        }).catch(function (error) {  
            console.log(error)  
        })
    }

    componentWillUnmount(){
        $('#navSearch').removeClass('active')
    }

    tableRows(){  
        return this.state.games.map((row, i) => {  
            return <TableRow obj={ row} index={ i } key={ i }/> 
        })
    }

    getRandomSearchTerm(){
        var randomNumber  = Math.floor(Math.random() * this.exampleSearchTerms.length);
        console.log(randomNumber)
        return this.exampleSearchTerms[randomNumber]
    }

    handleInputChange(event){
        console.log(event.target.value)
        this.searchGame(event.target.value)
    }

    searchGame(name){
        let object = {}
        object.name = name;
        axios.post("http://localhost:3002/games/searchAll", object).then( response =>{
            this.setState( { games: response.data } )
        }).catch(function (error) {  
            console.log(error)  
        })
    }

    render(){
        return(
            <div id="listGames">  
            <h1 className='display-4'>Search Games</h1>
            <br/><br/>
            <input onChange={this.handleInputChange} type="text" name="name" id="name" placeholder={this.getRandomSearchTerm()}/>
            <br/><br/>
            <h2>Results</h2>
            <table className='table table-striped'>  
              <thead>  
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>Name</th>  
                  <th>Description</th>  
                  <th>Price</th>  
                </tr>  
              </thead>  
              <tbody>  
               { this.tableRows() }
              </tbody>  
            </table>  
          </div>  
        )
    }
}