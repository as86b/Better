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
import Footer from './components/Footer';

// declare endpoint for server
const endpoint = 'http://localhost:4000';

// setup socket connection with backend
const socket = socketIOClient(endpoint);

class App extends Component {
  render() {
    return (
      <div className = "contentArea">
        <Header></Header>
        <main>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
        <h1>Hello World</h1>
   
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
