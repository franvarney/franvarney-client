import React, {createClass, PropTypes} from 'react'
import {History} from 'react-router'
import Request from 'superagent'

import Config from '../../config'
import ErrorMessage from '../layout/Error'

let SubmitPlace = createClass({
  mixins: [History],

  propTypes: {
    place: PropTypes.shape({
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
      }),
      name: PropTypes.string,
      placeId: PropTypes.string
    })
  },

  getInitialState() {
    return {
      error: null
    }
  },

  submitPlace(event) {
    const {value: message} = document.getElementById('message')
    const {value: name} = document.getElementById('name')

    if (!message) {
      this.state.error = 'A message is required'
      this.setState(this.state)
      return
    } else {
      this.state.error = null
      this.setState(this.state)
    }

    const {location, name: placeName, placeId} = this.props.place

    let submission = {
      location,
      place: { id: placeId, name: placeName },
      visitor: { message, name }
    }

    Request
      .post(`${Config.api.url}/places`)
      .set('Content-Type', 'application/json')
      .send(submission)
      .end((err, response) => {
        if (err) {
          console.error(err)
          this.state.error = err.message
          this.setState(this.state)
        } else {
          this.history.pushState(null, '/map')
        }
      })
  },

  componentDidMount() {
    document.getElementById('message').focus()
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.error === this.state.error
  },

  render() {
    const {location, name, placeId} = this.props.place

    let place = null
    if (name) place = <p>Location Name: {name}</p>

    let error = null
    if (this.state.error) error = <ErrorMessage error={this.state.error} />

    return (
      <div className="submit-location-container container">
        <h2>Leave a Message</h2>
        {error}
        <p className="note">Leave a message and optionally include your name (otherwise, defaults to "anonymous").</p>
        <p>Location Coordinates: {`${location.latitude},${location.longitude}`}</p>
        {place}
        <p>Your Message: <input type="text" id="message" /></p>
        <p>Your Name: <input type="text" id="name" placeholder="optional" /></p>
        <span className="link-button dark">
          <a onClick={this.submitPlace}>Submit &raquo;</a>
        </span>
      </div>
    )
  }
})

export default SubmitPlace
