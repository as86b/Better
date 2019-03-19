/* eslint-disable no-fallthrough */
/* example component. follow this template */

import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
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