import React, {createClass} from 'react'
import Request from 'superagent'

import AboutMe from '../components/AboutMe'
import BlogSnippet from '../components/Blog/Snippet/Container'
import Config from '../config'
import DefaultLayout from '../layouts/Default'
import Experience from '../components/Jobs/Container'
import GithubActivityGraph from '../components/GitHubActivities'
import ImageBlock from '../components/Layout/ImageBlock'
import Lilac from '../assets/images/lilac.jpg'
import Ducky from '../assets/images/ducky.jpg'

const Home = createClass({
  getInitialState () {
    return {
      activities: [],
      jobs: [],
      width: 0
    }
  },

  handleResize () {
    this.setState({
      width: document.getElementById('github-activity').offsetWidth - 70
    })
  },

  getActivities () {
    Request
      .get(`${Config.api.url}/github/activities`)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        if (err) console.log(err)
        this.state.activities = response.body
        this.setState(this.state)
      })
  },

  getJobs () {
    let url = `${Config.api.url}/jobs?present=true`

    Request
      .get(url)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        if (err) console.log(err)
        this.state.jobs = response.body
        this.setState(this.state)
      })
  },

  componentDidMount () {
    this.handleResize()
    this.getActivities()
    this.getJobs()
    window.addEventListener('resize', this.handleResize)
  },

  render () {
    return (
      <DefaultLayout classes="page-home">
        <div className="wrap container">
          <AboutMe />
          <ImageBlock img={Ducky} />
        </div>
        <div id="github-activity" className="container white">
          <h2 className="full">Github Activity</h2>
          <GithubActivityGraph activities={this.state.activities} width={this.state.width} />
        </div>
        <BlogSnippet />
        <div className="wrap container">
          <Experience jobs={this.state.jobs} />
          <ImageBlock img={Lilac} />
        </div>
      </DefaultLayout>
    )
  }
})

export default Home
