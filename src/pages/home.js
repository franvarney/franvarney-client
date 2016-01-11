import React, {createClass} from 'react'
import {RouteHandler} from 'react-router'

import Header from '../components/header'
import Jobs from '../components/jobs'
import Projects from '../components/projects'

let Home = createClass({
  closeModal (event) {
    document.getElementById('modal').style.display = 'none'
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
        <div id="modal" onClick={this.closeModal}>
          <span id="modal-text">Click image to close</span>
          <img id="modal-image" src="" />
        </div>
      </div>
    )
  }
})

export default Home
