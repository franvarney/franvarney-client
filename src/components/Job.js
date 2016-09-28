import React, {createClass, PropTypes} from 'react'

import Constants from '../constants'

const Job = createClass({
  getDefaultProps () {
    return {
      job: {}
    }
  },

  formatDate(date) {
    let {monthNames} = Constants
    if (date === 'Present') return date

    date = new Date(date)
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
  },

  render() {
    const {employer, dates, location, title} = this.props.job

    return (
      <div className="row">
        <h3>{employer}</h3><span className="title">, {title}</span>
        <p className="location"><span>{location.city}, {location.state}</span></p>
        <p className="date">
          <em>{this.formatDate(dates.start)} to {this.formatDate(dates.end)}</em>
        </p>
      </div>
    )
  }
})

Job.displayName = 'JobComponent'

Job.propTypes = {
  job: PropTypes.shape({
    employer: PropTypes.string.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired,
    date: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired
    })
  })
}

export default Job
