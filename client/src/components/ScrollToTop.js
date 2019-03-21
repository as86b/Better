/* 
    components/ScrollToTop

    Helper component that will automatically scroll the user
    to the top of a view whenever a new view is rendered
*/

import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {

  

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)