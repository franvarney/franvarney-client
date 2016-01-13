import React, {createClass} from 'react'
import Request from 'superagent'

import Config from '../../config'
import GithubActivityGraph from './Graph'

let GithubActivityContainer = createClass({
  getInitialState() {
    return {
      activities: []
    }
  },

  formatActivities(activities) {
    return activities.map((activity) => {
      return [activity.date, parseInt(activity.total)]
    })
  },

  getActivities() {
    Request
      .get(`${Config.api.url}/github/activities?auth_token=${Config.api.token}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) console.log(err)

        this.setState({
          activities: this.formatActivities(JSON.parse(res.text))
        })
      })
  },

  componentDidMount() {
    this.getActivities()

    this.state.width = document.getElementsByClassName('github-activity-container')[0].offsetWidth
    this.setState(this.state)
  },

  render() {
    return (
      <div className="github-activity-container container">
        <h2>GitHub Activity</h2>
        <GithubActivityGraph activities={this.state.activities} width={this.state.width} />
      </div>
    )
  }
})

export default GithubActivityContainer
