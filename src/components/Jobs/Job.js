import React, {createClass, PropTypes} from 'react'

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
    if (date === 'Present') return date

    let monthNames =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    date = new Date(date)
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
  },

  render() {
    let {employer, dates, location, tasks, title} = this.props.job

    return (
      <div className="job-container container">
        <h3>{employer}</h3> - <em>{this.formatDate(dates.start)} to {this.formatDate(dates.end)}</em>
        <p className="title">{title} in {location.city}, {location.state}</p>
        <div>
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
