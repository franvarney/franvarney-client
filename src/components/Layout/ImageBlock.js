import React, {createClass} from 'react'

let ImageBlock = createClass({
  render() {
    return (
      <div className="image-container container">
         <div style={ { backgroundImage: `url('${this.props.img}')`} } />
      </div>
    )
  }
})

export default ImageBlock
