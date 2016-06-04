import React, {createClass, PropTypes} from 'react'
import Request from 'superagent'

import Config from '../../config'
import SubmitLocation from './SubmitLocation'

let SelectLocation = createClass({
  propTypes: {
    place: PropTypes.arrayOf(PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
      }),
      name: PropTypes.string,
      placeId: PropTypes.string
    }))
  },

  getInitialState() {
    return {
      selected: null
    }
  },

  selectPlace(e) {
    let {place} = e.target.dataset
    place = JSON.parse(place)
    let {location, name, placeId} = place

    this.state.selected = { location, name, placeId }
    this.setState(this.state)
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.selected === this.state.selected
  },

  render() {
    const {places} = this.props

    if (this.state.selected) return (<SubmitLocation place={this.state.selected} />)

    return (
      <div className="select-location-container container">
        <h2>Select a Location</h2>
        <p className="note">Click on a location to select.</p>
        <div id="place-form">
          <ul>
            {places.map((place, i) => {
              return <li onClick={this.selectPlace}
                         data-place={JSON.stringify(place)}
                         className="place"
                         key={i}>
                         {place.name || 'Current Location (non-specific)'}
                     </li>
            })}
          </ul>
        </div>
      </div>
    )
  }
})

export default SelectLocation
