/* 
  frontend entry point

  NOTE on routing structure
  - views are full pages that should be rendered between the header and footer
  - components are pieces of views that should be composed and reused
  - DO NOT route to a single component, routing should only be done to a view 

  link to color pallette: http://paletton.com/#uid=53a0u0kgtOf5uZcbsUxkJGooIxF
*/


import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

// packages 
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';


// view imports 
import ExampleView from './views/ExampleView';
import ExampleView2 from './views/ExampleView2';

// component imports 
import Example from './components/Example';

// declare endpoint for server
const endpoint = 'http://localhost:4000';

// setup socket connection with backend
const socket = socketIOClient(endpoint);

class App extends Component {
  render() {
    return (
      <div className="container-fluid center">
        <Switch>
          <Route exact path="/" component={ExampleView}></Route>
          <Route path="/example2" component={ExampleView2}></Route>
          {/* default case */}
          <Route component={ExampleView}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
