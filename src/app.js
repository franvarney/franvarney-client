import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import CSS from './styles/index.styl';
import Header from './components/header';
import Jobs from './components/jobs';
import Projects from './components/projects';

let App = React.createClass({
  closeModal (event) {
    document.getElementById('modal').style.display = 'none';
  },

  render() {
    return (
      <div className='wrap'>
        <Header />
        <div id='content'>
          <hr/>
          <div className="jobs">
            <Jobs />
          </div>
          <hr />
          <div className="projects">
            <Projects />
          </div>
          <hr />
        </div>
        <RouteHandler />
        <div id="modal" onClick={ this.closeModal }><span id="modal-text">Click image to close</span><img id="modal-image" src="" /></div>
      </div>
    );
  }
});

let routes = (
  <Route name='app' path='/' handler={ App }>
    //
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body);
});
