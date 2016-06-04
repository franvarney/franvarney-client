import React, {createClass, PropTypes} from 'react'
import Request from 'superagent'

import Config from '../../config'
import ErrorMessage from '../layout/Error'
import SelectLocation from './SelectLocation'

let GetLocation = createClass({
  propTypes: {
    places: PropTypes.arrayOf(React.PropTypes.shape({
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
      places: []
    }
  },

  getPlaces() {
    const {latitude, longitude} = this.props.location
    const {value} = document.getElementById('keyword')
    let url = `${Config.api.url}/places/search?location=${latitude},${longitude}`

    if (value) url = `${url}&keyword=${value}`

    Request
      .get(url)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        if (err) console.log(err)

        let defaultLocation = { location: { latitude, longitude } }

        response = JSON.parse(response.text)
        response.pop()

        this.state.places = [defaultLocation].concat(response)
        this.setState(this.state)
      })
  },

  componentDidMount() {
    document.getElementById('keyword').focus()
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.places === this.state.places ||
           nextProps.error !== this.props.error
  },

  render() {
    if (this.state.places.length) return (<SelectLocation places={this.state.places} />)

    let error = null
    if (this.props.error) error = <ErrorMessage error={this.props.error} />

    return (
      <div className="get-location-container container">
        <h2>Get A Location</h2>
        {error}
        <p className="note">Enter an optional keyword to search by or just hit submit.</p>
        <p>Keyword: <input type="text" id="keyword" placeholder="optional" /></p>
        <span className="link-button dark">
          <a onClick={this.getPlaces}>Submit &raquo;</a>
        </span>
      </div>
    )
  }
})

export default GetLocation
