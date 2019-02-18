/* example component. follow this template */

import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import logo from '../assets/img/mountain.png';

class Header extends React.Component {
    render() {
        return(
            <div>
                <nav>
                    <a href="#" class="brand-logo left">
                        <img src={logo} alt="Better" width="50" height="50"></img>
                        <p>Better</p>
                    </a>
                </nav>
                <p>Better</p>
            </div>
        );
    }
}

export default Header;