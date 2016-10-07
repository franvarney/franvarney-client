import React, {createClass, PropTypes} from 'react'
import {Link} from 'react-router'

const LinkButton = createClass({
  getDefaultProps () {
    return {
      hasArrow: true,
      text: 'Submit'
    }
  },

  render () {
    const {hasArrow, path, text} = this.props
    const arrow = <span>&raquo;</span>

    return (
      <span className="link">
        <Link to={path}>{text} {hasArrow && arrow}</Link>
      </span>
    )
  }
})

LinkButton.displayName = 'LinkButtonComponent'

LinkButton.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string,
  hasArrow: PropTypes.bool
}

export default LinkButton
