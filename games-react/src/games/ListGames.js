import React, { Component } from 'react'
import axios from 'axios'
import TableRow from './TableRow'
import $ from 'jquery'

export default class ListGames extends Component{
    
    constructor(props) {  
        super(props)
        this.state = { games: [] }
    }

    componentDidMount(){
        
        axios.get("http://localhost:3002/games").then( response => {
            this.setState( { games: response.data } )
        }).catch(function (error) {  
            console.log(error)  
        })

    }

    tableRows(){  
        return this.state.games.map((row, i) => {  
            return <TableRow obj={ row } key={ i }/> 
        })
    }

    render(){
        console.log(this.state.games);
        $('#test').addClass('active')
        return(
            <div>  
            <h1 className='display-4'>All Games</h1>
            <br/><br/>
            <table className='table table-striped'>  
              <thead>  
                <tr>  
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