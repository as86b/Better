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
import { Route, Switch } from 'react-router-dom';


// view imports 
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import LandingView from './views/LandingView';
import AboutView from './views/AboutView';
import DashboardView from './views/DashboardView';
import ProfileView from './views/ProfileView';
import CreatePostView from './views/CreatePostView';

// component imports 
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// import '../App.css';

// setup socket connection with backend
// TODO setup socket. 
//    commenting this out for now to prevent ongoing error messages in console
// const socket = socketIOClient(endpoint);

class App extends Component {
  constructor(props) {
    super(props);

    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  /*
    FIXME FIXME FIXME
    This needs to be stored in localstorage instead of just the state 
    when it is stored in state the data gets lost on a refresh 
  */
  loginUser(username, token) {
    console.log('logging in ' + username);
  }

  render() {
    return (
      <div className="container-fluid">
         <Header></Header>

          <ScrollToTop>
            <div className="switchStyle">
              <Switch>
                  <Route exact path="/" component={LandingView}></Route>
                  <Route path="/dashboard" component={DashboardView}></Route>
                  <Route path="/profile" component={ProfileView}></Route>
                  {/* have to use this long obscene method to pass props in router */}
                  <Route path="/login" render={(props) => <LoginView {...props} loginUser={this.loginUser}/>}></Route>
                  <Route path="/register" render={(props) => <RegisterView {...props} loginUser={this.loginUser}/>}></Route>
                  <Route path="/about" component={AboutView}></Route>
                  <Route path="/createpost" component={CreatePostView}></Route>
                  {/* default case - TODO possibly make a 404 error for here */}
                  <Route component={LandingView}></Route>
              </Switch>
          </div>  
        </ScrollToTop>

        <Footer></Footer>
      </div>
    );
  }
}

export default App;
// manage the endpoint of the server for api requests
export const endpoint = 'http://localhost:4000'