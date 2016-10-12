import React, {Component, PropTypes} from 'react'

import Button from '../Layout/Button'

class Form extends Component {
  defaultProps () {
    error: null
  }

  shouldComponentUpdate (nextProps) {
    return !!nextProps.error
  }

  render () {
    const {error} = this.props
    const props = Object.assign({}, this.props)
    delete props.error

    return (
      <form {...props}>
        {this.props.children}
        <div id="submit" className="row">
          <div className="column half error">
            {error && <p>ERROR: {error}</p>}
          </div>
          <div className="column half"><Button /></div>
        </div>
      </form>
    )
  }
}

Form.displayName = 'FormComponent'

Form.propTypes = {
  error: PropTypes.string
}

export default Form
