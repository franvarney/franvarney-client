import React, {createClass, PropTypes} from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

const MARKER_WIDTH = 6
const MARKER_HEIGHT = 6

const markerStyle = {
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

  shouldComponentUpdate(nextProps, nextState) {
    return shouldPureComponentUpdate
  },

  render() {
    return (
      <div
        style={markerStyle}
        data-visitor={JSON.stringify(this.props.visitor)}
        data-place={JSON.stringify(this.props.place)}
        onClick={this.props.showMarkerDetail} />
    )
  }
})

export default Marker
