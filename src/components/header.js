import React from 'react';

import Navigation from './navigation';

let Header = React.createClass({
  render() {
    return (
      <div id="header">
        <h1>Fran Varney</h1>
        <Navigation />
      </div>
    );
  }
});

export default Header;
