import React, {createClass, PropTypes} from 'react'
import Request from 'superagent'

import Config from '../../config'
import Job from './Job'
import LinkButton from '../Layout/LinkButton'

let JobContainer = createClass({
  render() {
    console.log('1')

    if (this.props.jobs.length === 1) {
      return (
        <div className="jobs-container container">
          <h2>Experience</h2>
          <Job job={this.props.jobs[0]} />
          <div className="link-button-container container">
            <LinkButton path="/resume" text="See Full Resume" />
          </div>
        </div>
      )
    }

    return (
      <div className="jobs-container container">
        <h2>Experience</h2>
        {this.props.jobs.map((job, index) => {
          return <Job key={index} job={job} />
        })}
      </div>
    )
  }
})

export default JobContainer
