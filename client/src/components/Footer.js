/* example component. follow this template */

import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

class Footer extends React.Component  {
    
    // componentDidMount() {

    //     let path = this.props.location.pathname;

    //     this.pageBodyLoader(path);
    // };

    openModal() {
        
    };

    render() {
        
        // if(not mobile design)
        return(
            <div>
                <footer className="page-footer footerBar">
                  <div className="footer-copyright">
                    <div className="container">
                        <a className="grey-text text-lighten-4 left" href="#">About</a>

                        {/*  */}
                        <a className="grey-text text-lighten-4 right" 
                            href="https://suicidepreventionlifeline.org" 
                            onClick="onClick={this.openModal}">
                            
                            Get Help
                        </a>
                        <p className="grey-text text-lighten-4 right">1-800-273-8255</p>
                    </div>
                  </div>
                </footer>
            </div>
        );
    };
}

export default Footer;
