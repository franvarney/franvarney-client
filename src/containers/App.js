import React, {createClass} from 'react'

import '../assets/favicon.ico'

let App = createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

export default App
