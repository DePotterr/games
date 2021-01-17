import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import '../styles/style.css'
import {Input, Form, Container, Col, FormGroup, Label} from 'reactstrap'

export default class DeleteGame extends Component{

    constructor(props){
        super(props)
        // get product name from url (/delete/name)
        // const gameName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        // this.state = { name: gameName }
        console.log(this.props)
        if(this.props.match){
            this.state = { name: props.match.params.game }
        }else{
            this.state = "";
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.delete = this.delete.bind(this)
    }

    componentDidMount(){
        $('#navDelete').addClass('active')
    }

    componentWillUnmount(){
        $('#navDelete').removeClass('active')
    }

    handleInputChange(event){
        this.setState({ [event.target.name]: event.target.value })
    }

    delete() {
        axios.delete('http://localhost:3002/games/delete/' + this.state.name)
            .then(res => {
              console.log(res)
                window.location.href = "http://localhost:3000"
            })
            .catch(function (error) {  
              console.log(error)  
            }) 
            //this.props.history.push('/list')
      }

    render(){
        return(
            <Container className='App'>  
                <h1 className='display-4'>Delete Game</h1>
                <br/>
                <Form className='form-group w-50'>  
                <Col>  
                    <FormGroup row>  
                    <Label for='name'>Name</Label>  
                        <Input type='text' className='form-control' name='name' value={ this.state.name } 
                            onChange={ this.handleInputChange } placeholder='Enter game name' />  
                    </FormGroup>  
                </Col>  
                <Col>  
                    <FormGroup row>  
                    <button type='button' onClick={ this.delete } className='btn btn-outline-primary'>Delete</button>  
                    </FormGroup>  
                </Col>  
                </Form>
            </Container>
        )
    }
}