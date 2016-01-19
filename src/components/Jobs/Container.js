import React, {createClass, PropTypes} from 'react'
import Request from 'superagent'

import Config from '../../config'
import Job from './Job'
import LinkButton from '../Layout/LinkButton'

let JobContainer = createClass({
  getInitialState() {
    return {
      jobs: []
    }
  },

  getPosts(isPresent) {
    let url = `${Config.api.url}/jobs?auth_token=${Config.api.token}`
    if (isPresent) url = `${url}&present=true`

    Request
      .get(url)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) console.log(err)

        this.setState({
          jobs: JSON.parse(res.text)
        })
      })
  },

  componentDidMount() {
    this.getPosts(this.props.isPresent)
  },

  render() {
    if (this.state.jobs.length === 1) {
      return (
        <div className="jobs-container container">
          <h2>Experience</h2>
          <Job job={this.state.jobs[0]} />
          <div className="link-button-container container">
            <LinkButton path="/resume" text="See Full Resume" />
          </div>
        </div>
      )
    }

    return (
      <div className="jobs-container container">
        <h2>Experience</h2>
        {this.state.jobs.map((job, index) => {
          return <Job key={index} job={job} />
        })}
      </div>
    )
  }
})

export default JobContainer
