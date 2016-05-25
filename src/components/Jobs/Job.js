import React, {createClass, PropTypes} from 'react'

import Constants from '../../constants'

let Job = createClass({
  getDefaultPropTypes() {
    return {
      job: {
        dates: {},
        location: {}
      }
    }
  },

  formatDate(date) {
    let {monthNames} = Constants
    if (date === 'Present') return date

    date = new Date(date)
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
  },

  render() {
    const {employer, dates, location, tasks, title} = this.props.job

    return (
      <div className="job-container container">
        <h3>{employer}</h3>, <span className="title">{title}</span>
        <p className="date"><em>{this.formatDate(dates.start)} to {this.formatDate(dates.end)}</em></p>
        <div>
          <h5>Respsonibilities and Accomplishments:</h5>
          <ul>
            { tasks.map((task, index) => {
              return <li key={index}>{task}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
})

export default Job
