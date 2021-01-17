import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import '../styles/style.css'
import {Input, Form, Container, Col, FormGroup, Label} from 'reactstrap'

export default class AddGame extends Component{

    constructor(props){
        super(props)

        this.state = { name: "", description: "", price: "" }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addGame = this.addGame.bind(this);
    }

    componentDidMount(){
        $('#navAdd').addClass('active')
    }

    componentWillUnmount(){
        $('#navAdd').removeClass('active')
    }

    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value })
    }

    addGame(){
        axios.post('http://localhost:3002/games/add', this.state )
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
            <h1>Add Game</h1>
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
                <button type="button" onClick={ this.addGame } className='btn btn-outline-primary'>Add</button>
              </FormGroup>
              </Col>
            </Form>
          </Container>
        )
    }
}