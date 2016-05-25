import React, {createClass} from 'react'
import Request from 'superagent'

import AboutMe from '../components/AboutMe'
import BlogSnippet from '../components/Blog/Snippet/Container'
import Config from '../config'
import DefaultLayout from '../layouts/Default'
import Experience from '../components/Jobs/Container'
import GithubActivities from '../components/GithubActivities/Container'
import ImageBlock from '../components/Layout/ImageBlock'

let Home = createClass({
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
      .get(`${Config.api.url}/github/activities`)
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
  },

  render() {
    return (
      <DefaultLayout classes="page-home">
        <div className="wrap-container container">
          <AboutMe />
          <ImageBlock url="https://scontent.fash1-1.fna.fbcdn.net/hphotos-xta1/t31.0-8/12113502_10153109258402681_597414416482409143_o.jpg" />
        </div>
        <GithubActivities activities={this.state.activities} />
        <BlogSnippet />
        <div className="wrap-container container">
          <Experience isPresent={true} />
          <ImageBlock url="https://scontent.fash1-1.fna.fbcdn.net/hphotos-xaf1/v/t1.0-9/25425_397165867680_1734529_n.jpg?oh=fbb060edfde5bd338a5b5dcc102a2bc9&oe=56FB91D0" />
        </div>
      </DefaultLayout>
    )
  }
})

export default Home
