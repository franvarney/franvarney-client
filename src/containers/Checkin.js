import React, {createClass} from 'react'

import DefaultLayout from '../layouts/Default'
import GetLocation from '../components/CheckIns/GetLocation'

let CheckIn = createClass({
  getInitialState() {
    return {
      error: null,
      location: null
    }
  },

  getCoords() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.state.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      this.setState(this.state)
    }, (error) => {
      this.state.error = error.message
      this.setState(this.state)
    })
  },

  componentWillMount() {
    this.getCoords()
  },

  render() {
    return (
      <DefaultLayout classes="page-checkin">
        <GetLocation location={this.state.location} error={this.state.error} />
      </DefaultLayout>
    )
  }
})

export default CheckIn
