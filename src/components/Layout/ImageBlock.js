import React, {createClass} from 'react'

const ImageBlock = createClass({
  render () {
    return (
      <div className="image column half">
        <div style={ { backgroundImage: `url('${this.props.img}')`} } />
      </div>
    )
  }
})

ImageBlock.displayName = 'ImageBlockComponent'

export default ImageBlock
