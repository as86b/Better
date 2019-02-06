import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

class Header extends React.Component {
    render() {
        return(
            <div>
                <nav>
                    <a href="#" class="brand-logo left" src="..">Logo</a>

                </nav>
                
                <p>This is the NavBar</p>
            </div>
        );
    }
}

export default Header;