import React, {createClass} from 'react'
import Request from 'superagent'

import BlogSnippet from '../components/Blog/Snippet'
import Config from '../config'
import DefaultLayout from '../layouts/Default'
import Job from '../components/Job'
import GithubActivityGraph from '../components/GitHubActivities'
import ImageBlock from '../components/Layout/ImageBlock'
import Lilac from '../assets/images/lilac.jpg'
import LinkButton from '../components/Layout/LinkButton'
import Ducky from '../assets/images/ducky.jpg'

const Home = createClass({
  getInitialState () {
    return {
      activities: [],
      jobs: [],
      post: {},
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
    Request
      .get(`${Config.api.url}/jobs`)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        if (err) console.log(err)
        this.state.jobs = response.body
        this.setState(this.state)
      })
  },

  getLatestPost () {
    Request
      .get(`${Config.api.url}/posts?latest=true`)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        if (err) console.log(err)
        this.state.post = response.body[0]
        this.setState(this.state)
      })
  },

  componentDidMount () {
    this.handleResize()
    this.getActivities()
    this.getJobs()
    this.getLatestPost()
    window.addEventListener('resize', this.handleResize)
  },

  render () {
    const {jobs, post} = this.state

    return (
      <DefaultLayout classes="page-home">
        <div className="row dark">
          <div id="about-me" className="column half dark">
            <h2 className="full">About</h2>
            <p>Hi! I'm Fran Varney. I'm currently a software engineer at Modulus.</p>
            <p>I grew up loving art and started on a path to photography, but after
            taking a programming class for fun, I ended up loving it and made my move
            into development.</p>
            <p>In my free time I still love photography, along with drooling over
            mechanical keyboards and playing video games.</p>
          </div>
          <div id="keyboard" className="column half image"><img src={Ducky} /></div>
        </div>
        <div id="github-activity" className="row white">
          <div className="column">
            <h2 className="full">Github</h2>
            <GithubActivityGraph activities={this.state.activities} width={this.state.width} />
          </div>
        </div>
        <BlogSnippet post={post} />
        <div className="row white">
          <div id="lilac" className="column half image"><img src={Lilac} /></div>
          <div id="jobs" className="column half white">
            <h2 className="column">Career</h2>
            {jobs.map((job, index) => {
              return <Job key={index} job={job} />
            })}
            <div className="links row">
              <LinkButton path="/resume" text="See Full Resume" />
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
})

export default Home
