import React, {createClass} from 'react'

import GithubActivityGraph from './Graph'

let GithubActivityContainer = createClass({
  getInitialState() {
    return {
      width: 0
    }
  },

  componentDidMount() {
    this.state.width = document.getElementsByClassName('github-activity-container')[0].offsetWidth - 70
    this.setState(this.state)
  },

  render() {
    return (
      <div className="github-activity-container container">
        <h2>Github Activity</h2>
        <GithubActivityGraph activities={this.props.activities} width={this.state.width} />
      </div>
    )
  }
})

export default GithubActivityContainer
