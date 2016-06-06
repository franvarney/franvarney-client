import React, {createClass} from 'react'
import Request from 'superagent'

import Config from '../config'
import DefaultLayout from '../layouts/Default'
import GoogleMapReact from 'google-map-react'
import Marker from '../components/Map/Marker'
import Stylers from '../components/Map/stylers'

let GoogleMap = createClass({
  getDefaultProps() {
    return {
      center: { lat: 39.1031182, lng: -84.5120196 }, // Cincinnati
      zoom: 4
    }
  },

  getInitialState() {
    return {
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
        this.setState(this.state)
      })
  },

  componentWillMount() {
    this.getLocations()
  },

  render() {
    const {places} = this.state

    return (
      <DefaultLayout classes="page-map">
        <GoogleMapReact
          options={this.createMapOptions}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
          {places.map((place, i) => {
            let {location, visitor} = place
            let message, name

            if (visitor) message = visitor.message, name = visitor.name

            return (
              <Marker
                key={i}
                lat={place.location.latitude}
                lng={place.location.longitude}/>
            )
          })}
        </GoogleMapReact>
      </DefaultLayout>
    )
  }
})

export default GoogleMap
