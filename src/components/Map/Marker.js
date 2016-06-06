import React, {createClass, PropTypes} from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

const MARKER_WIDTH = 5
const MARKER_HEIGHT = 5

const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  backgroundColor: '#895584',
  border: '3px solid #FFF',
  color: '#FFF',
  fontSize: '14px',
  height: MARKER_HEIGHT,
  left: -MARKER_WIDTH / 2,
  padding: 3,
  position: 'absolute',
  textAlign: 'center',
  top: -MARKER_HEIGHT / 2,
  width: MARKER_WIDTH
}

let Marker = createClass({
  propTypes: {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  },

  shouldComponentUpdate() {
    return shouldPureComponentUpdate
  },

  render() {
    return (
      <div className="marker" style={markerStyle}>
        {this.props.text}
      </div>
    )
  }
})

export default Marker
