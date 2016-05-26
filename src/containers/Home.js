import React, {createClass} from 'react'
import Request from 'superagent'

import AboutMe from '../components/AboutMe'
import BlogSnippet from '../components/Blog/Snippet/Container'
import Config from '../config'
import DefaultLayout from '../layouts/Default'
import Experience from '../components/Jobs/Container'
import GithubActivities from '../components/GithubActivities/Container'
import ImageBlock from '../components/Layout/ImageBlock'
import Lilac from '../assets/images/lilac.jpg'
import Ducky from '../assets/images/ducky.jpg'

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
          <ImageBlock img={Ducky} />
        </div>
        <GithubActivities activities={this.state.activities} />
        <BlogSnippet />
        <div className="wrap-container container">
          <Experience isPresent={true} />
          <ImageBlock img={Lilac} />
        </div>
      </DefaultLayout>
    )
  }
})

export default Home
