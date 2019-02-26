/* example component. follow this template */

import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

class Footer extends React.Component  {
    
    openModal() {
        this.setState({modalIsOpen: true});
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

        //mobile design
        //else {
        //Code is currently unreachable
             return(
                <div>
                <footer className="page-footer footerBar">
                  <div className="footer-copyright">
                    <div className="container">
                        <a className="grey-text text-lighten-4" href="#">Get Help</a>
                        
                    </div>
                  </div>
                </footer>
            </div>
            );
        //}
    }
}

export default Footer;
