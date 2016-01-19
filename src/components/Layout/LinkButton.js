import React, {createClass, PropTypes} from 'react'
import {Link} from 'react-router'

let LinkButton = createClass({
  render() {
    const {path, text} = this.props

    return (
      <span className="link-button">
        <Link to={path}>{text} &raquo;</Link>
      </span>
    )
  }
})

export default LinkButton
