import React, {createClass} from 'react'
import {RouteHandler} from 'react-router'

import Home from '../pages/Home'

let App = createClass({
  render() {
    return (
      <div><Home /></div>
    )
  }
})

export default App
