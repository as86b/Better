/* example component. follow this template */

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

class Example extends Component {
    render() {
        return(
            <div>
                <footer class="page-footer">
                  <div class="container">
                    <div class="row">
                      <div class="col l6 s12">
                        <h5 class="white-text">Footer Content</h5>
                        <p class="grey-text text-lighten-4">Testing</p>
                      </div>
                      <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">Links</h5>
                        <ul>
                          <li><a class="grey-text text-lighten-3" href="#!">Testing</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="footer-copyright">
                    <div class="container">
                    © 2014 Copyright Text
                    <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
                    </div>
                  </div>
                </footer>
            </div>
        );
    }
}

export default Example;
