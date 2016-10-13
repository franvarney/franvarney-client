import GoogleMapReact from 'google-map-react'
import React, {createClass} from 'react'
import Request from 'superagent'

import Button from '../components/Layout/Button'
import Config from '../config'
import DefaultLayout from '../layouts/Default'
import Marker from '../components/Map/Marker'
import MarkerDetails from '../components/Map/MarkerDetails'
import {Place} from '../utils/sdk'
import Stylers from '../components/Map/stylers'

const GoogleMap = createClass({
  getDefaultProps () {
    return {
      center: { lat: 39.1031182, lng: -84.5120196 }, // Cincinnati
      zoom: 4
    }
  },

  getInitialState () {
    return {
      error: null,
      places: {
        all: [],
        current: [],
        self: [],
        visitors: []
      }
    }
  },

  createMapOptions (maps) {
    return {
      panControl: true,
      mapTypeControl: false,
      scrollwheel: true,
      styles: Stylers
    }
  },

  showMarkerDetail (event) {
    let {place, visitor} = event.target.dataset
    const element = document.getElementById('marker-details-modal')

    if (place) place = JSON.parse(place)
    if (visitor) visitor = JSON.parse(visitor)

    let message
    if (visitor) message = visitor.message
    if (message) message = `${message} - ${visitor.name}`

    if (place && place.name) element.children[0].innerHTML = place.name
    else element.children[0].innerHTML = 'Unspecified Location'
    element.children[1].innerHTML = message

    const bounds = event.target.getBoundingClientRect()
    element.style.display = 'inline-block'
    element.style.left = `${Math.abs(bounds.left + 3)}px`
    element.style.top = `${Math.abs(bounds.top + 3)}px`
  },

  getLocations () {
    this.setState({ error: null })
    Place.getAll({ condensed: true }, (err, places) => {
      if (err) return this.setState({ error: err }) // TODO what to do with error?
      this.state.places.all = this.state.places.current = places
      this.setState(this.state)
    })
  },

  filterPlaces (isVisitor) {
    const {all} = this.state.places
    return all.filter((place) => isVisitor === place.isVisitor)
  },

  resetPlaces () {
    this.state.places.current = this.state.places.all
    return this.setState(this.state)
  },

  selfPlaces () {
    if (!this.state.places.self.length) {
      this.state.places.self = this.filterPlaces(false)
    }
    this.state.places.current = this.state.places.self
    return this.setState(this.state)
  },

  visitorPlaces () {
    if (!this.state.places.visitors.length) {
      this.state.places.visitors = this.filterPlaces(true)
    }
    this.state.places.current = this.state.places.visitors
    return this.setState(this.state)
  },

  componentWillMount () {
    this.getLocations()
  },

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.places === this.state.places
  },

  render () {
    const {center, zoom} = this.props
    const {places} = this.state

    return (
      <DefaultLayout classes="page-map">
        <div id="button-wrap">
          <Button text="Places I've Been" onClick={this.selfPlaces} />
          <Button text="Visitor Messages" onClick={this.visitorPlaces} />
          <Button text="Show All" onClick={this.resetPlaces} />
        </div>
        <GoogleMapReact
          options={this.createMapOptions}
          defaultCenter={center}
          defaultZoom={zoom}>
          {places.current.map((checkin, i) => {
            const {location, place, visitor} = checkin
            return (
              <Marker
                key={i}
                lat={location.latitude}
                lng={location.longitude}
                visitor={visitor}
                place={place}
                showMarkerDetail={this.showMarkerDetail} />
            )
          })}
        </GoogleMapReact>
        <MarkerDetails />
      </DefaultLayout>
    )
  }
})

GoogleMap.displayName = 'GoogleMapContainer'

export default GoogleMap
