import React, {createClass, PropTypes} from 'react'
import {Link} from 'react-router'

const LinkButton = createClass({
  getDefaultProps () {
    return {
      text: 'Submit'
    }
  },

  render () {
    const {path, text} = this.props

    return (
      <span className="link">
        <Link to={path}>{text} &raquo;</Link>
      </span>
    )
  }
})

LinkButton.displayName = 'LinkButtonComponent'

LinkButton.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string
}

export default LinkButton
