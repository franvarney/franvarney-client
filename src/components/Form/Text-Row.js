import React, {Component, PropTypes} from 'react'

class TextRow extends Component {
  defaultProps () {
    name: null
  }

  render () {
    const {children, names} = this.props

    function buildLabel (title) {
      const lower = title.toLowerCase()
      return (
        <span className="column">
          <label id={`label-${lower}`} htmlFor={lower}>{title}</label>
        </span>
      )
    }

    function buildInput (children) {
      return (<span className="column">{children}</span>)
    }

    if (!Array.isArray(children)) {
      return (
        <div id={names.toLowerCase()} className="row">
          {buildLabel(names)}
          {buildInput(children)}
        </div>
      )
    }

    return (
      <div className="row">
        {names.map((name, i) => {
          return (
            <div key={i} id={name.toLowerCase()}
                 className={`column half ${i ? 'right' : 'left'}`}>
             {buildLabel(name)}
             {buildInput(children[i])}
            </div>
          )
        })}
      </div>
    )
  }
}

TextRow.displayName = 'TextRowComponent'

TextRow.propTypes = {
  names: React.PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.string),
    PropTypes.string
  ]).isRequired,
  children: React.PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.element),
    PropTypes.element
  ]).isRequired,
}

export default TextRow
