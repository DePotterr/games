import React, { Component } from 'react'

export default class TableRow extends Component {

  render() {  
    return (  
        <tr> 
          <td>  
            { this.props.obj.name }  
          </td>  
          <td>  
            { this.props.obj.description }  
          </td>  
          <td>  
            { this.props.obj.price }  
          </td>  
        </tr>  
    )
  }  
}  
