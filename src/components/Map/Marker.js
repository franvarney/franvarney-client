import React, {createClass, PropTypes} from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

const Marker = createClass({
  propTypes: {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    points: PropTypes.number
  },

  setStyles (points) {
    let markerHeight = 18
    let markerWidth = 18
    let lineHeight

    if (points > 1 && points < 10) (markerHeight = 24, markerWidth = 24, lineHeight = 17)
    if (points > 10) (markerHeight = 30, markerWidth = 30, lineHeight = 25)

    return {
      backgroundColor: '#895584',
      border: '3px solid #FFF',
      color: '#FFF',
      fontSize: '14px',
      height: markerHeight,
      lineHeight: `${lineHeight}px`,
      padding: 0,
      position: 'absolute',
      textAlign: 'center',
      verticalAlign: 'middle',
      width: markerWidth
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return shouldPureComponentUpdate
  },

  render () {
    const {points} = this.props
    return (
      <div
        style={this.setStyles(this.props.points)}
        data-visitor={JSON.stringify(this.props.visitor)}
        data-place={JSON.stringify(this.props.place)}
        onClick={points === 1 ? this.props.showMarkerDetail : undefined}>
        {points > 1 ? points : ''}
      </div>
    )
  }
})

export default Marker
