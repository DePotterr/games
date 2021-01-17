import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import '../styles/style.css'
import {Input, Form, Container, Col, FormGroup, Label} from 'reactstrap'

export default class EditGame extends Component{
    oldName = ""
    constructor(props){
        super(props)
        this.oldName = this.props.match.params.game
        this.state = { _id:"", _rev:"", name: "", description: "", price: "" }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.editGame = this.editGame.bind(this);
    }

    componentDidMount(){
        $('#navAdd').addClass('active')
        axios.post('http://localhost:3002/games/searchOne',{ name: this.oldName })
        .then(response => {  
          this.setState({ _id:response.data._id, _rev:response.data._rev, name: response.data.name, description: response.data.description, price: response.data.price }) 
          console.log(this.state)
        })  
        .catch(function (error) {  
          console.log(error)  
        })
    }

    componentWillUnmount(){
        $('#navAdd').removeClass('active')
    }

    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value })
    }

    editGame(){
        axios.post('http://localhost:3002/games/edit', this.state )
        .then(response =>{
          console.log(response);
          window.location.href = "http://localhost:3000"
        })
        .catch(err =>{
          console.log(err)
        })
        //this.props.history.push('/list');
    }
    render(){
        return(
            <Container>
            <h1>Edit Game</h1>
            <br/>
            <Form>
              <Col>
              <FormGroup row>
                <Label for="name">Name</Label>
                <Input type='text' className='form-control' name='name' value={ this.state.name } 
                      onChange={ this.handleInputChange } placeholder='Enter game name' />  
              </FormGroup>
              <FormGroup row>
                <Label for="description">Description</Label>
                <Input type='text' className='form-control' name='description' value={ this.state.description } 
                      onChange={ this.handleInputChange } placeholder='Enter game description' />  
              </FormGroup>
              <FormGroup row>
                <Label for="price">Price</Label>
                <Input type='text' className='form-control' name='price' value={ this.state.price } 
                      onChange={ this.handleInputChange } placeholder='Enter game price' />  
              </FormGroup>
              <FormGroup>
                <button type="button" onClick={ this.editGame } className='btn btn-outline-primary'>Edit</button>
              </FormGroup>
              </Col>
            </Form>
          </Container>
        )
    }
}