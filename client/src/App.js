/* frontend 
  link to color pallette: http://paletton.com/#uid=53a0u0kgtOf5uZcbsUxkJGooIxF
*/


import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

// component imports
import Example from './components/Example';
import Header from './components/Header';

// declare endpoint for server
const endpoint = 'http://localhost:4000';

// setup socket connection with backend
const socket = socketIOClient(endpoint);

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      
      <div>
        <Header></Header>
=======
      <div className="center">
>>>>>>> 32a139c843064c7539234f3f005c3bf83168b6c2
        <h1>Hello World</h1>
        <Example></Example>
      </div>
    );
  }
}

export default App;
