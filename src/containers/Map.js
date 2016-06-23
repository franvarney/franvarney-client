import GoogleMapReact from 'google-map-react'
import React, {createClass} from 'react'
import Request from 'superagent'

import Config from '../config'
import DefaultLayout from '../layouts/Default'
import Marker from '../components/Map/Marker'
import MarkerDetails from '../components/Map/MarkerDetails'
import Stylers from '../components/Map/stylers'

const GoogleMap = createClass({
  getDefaultProps() {
    return {
      center: { lat: 39.1031182, lng: -84.5120196 }, // Cincinnati
      zoom: 4
    }
  },

  getInitialState() {
    return {
      allPlaces: [],
      places: []
    }
  },

  createMapOptions(maps) {
    return {
      panControl: true,
      mapTypeControl: false,
      scrollwheel: true,
      styles: Stylers
    }
  },

  getLocations() {
    Request
      .get(`${Config.api.url}/places`)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        if (err) console.error(err)

        this.state.places = JSON.parse(response.text)
        this.state.allPlaces = this.state.places
        this.setState(this.state)
      })
  },

  showMarkerDetail(e) {
    const {target} = e
    let {place, visitor} = target.dataset
    const element = document.getElementById('marker-details-modal')

    if (place) place = JSON.parse(place)
    if (visitor) visitor = JSON.parse(visitor)

    let message
    if (visitor) message = visitor.message
    if (message) message = `${message} - ${visitor.name}`

    if (place && place.name) element.children[0].innerHTML = place.name
    else element.children[0].innerHTML = 'Unspecified Location'
    element.children[1].innerHTML = message

    const bounds = target.getBoundingClientRect()
    element.style.display = 'inline-block'
    element.style.left = `${Math.abs(bounds.left + 3)}px`
    element.style.top = `${Math.abs(bounds.top + 3)}px`
  },

  filterPlaces(isVisitor) {
    const {allPlaces} = this.state
    const filtered = allPlaces.filter((place) => isVisitor === place.isVisitor)

    this.state.places = filtered
    this.setState(this.state)
  },

  myPlaces() {
    return this.filterPlaces(false)
  },

  visitorPlaces() {
    return this.filterPlaces(true)
  },

  componentWillMount() {
    this.getLocations()
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.places === this.state.places
  },

  render() {
    const {places} = this.state

    return (
      <DefaultLayout classes="page-map">
        <div id="button-wrap">
          <div className="link-button dark">
            <a onClick={this.myPlaces}>Places I've Been &raquo;</a>
          </div>
          <div className="link-button dark">
            <a onClick={this.visitorPlaces}>Visitor Messages &raquo;</a>
          </div>
          <div className="link-button dark">
            <a onClick={this.getLocations}>Show All &raquo;</a>
          </div>
        </div>
        <GoogleMapReact
          options={this.createMapOptions}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
          {places.map((p, i) => {
            let {location, place, visitor} = p

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
