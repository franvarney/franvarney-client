import React, {createClass} from 'react'
import {RouteHandler} from 'react-router'

let App = createClass({
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
})

export default App
