import React, {createClass} from 'react'

let Error = createClass({
  render() {
    return (<p className="error">{`Error: ${this.props.error}`}</p>)
  }
})

export default Error
