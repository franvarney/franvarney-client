import React, {createClass, PropTypes} from 'react'

const Button = createClass({
  getDefaultProps () {
    return {
      color: 'dark',
      text: 'Submit'
    }
  },

  render () {
    const {color, text} = this.props
    const props = Object.assign({}, this.props)
    delete props.color, delete props.text

    return (
      <button
        {...props}
        className={`link-button ${color}`}>
        <a>{text} &raquo;</a>
      </button>
    )
  }
})

Button.displayName = 'ButtonComponent'

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string
}

export default Button
