/* frontend */

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
      
      <div>
        <Header></Header>
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default App;
