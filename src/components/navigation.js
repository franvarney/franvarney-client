import React from 'react';
import { Link } from 'react-router';

import Links from './links';

let Navigation = React.createClass({
  render() {
    return (
      <nav className="nav">
        <Links />
      </nav>
    );
  }
});

export default Navigation;

// Remember for later
// <ul>
//   <li><Link to="app">Home</Link></li>
// </ul>
