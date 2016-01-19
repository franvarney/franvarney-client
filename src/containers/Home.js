import React, {createClass} from 'react'
import {RouteHandler} from 'react-router'

import AboutMe from '../components/AboutMe'
import BlogSnippet from '../components/Blog/Snippet/Container'
import DefaultLayout from '../layouts/Default'
import Experience from '../components/Jobs/Container'
import GithubActivities from '../components/GithubActivities/Container'
import ImageBlock from '../components/Layout/ImageBlock'

let Home = createClass({
  render() {
    return (
      <DefaultLayout classes="page-home">
        <div className="wrap-container container">
          <AboutMe />
          <ImageBlock url="https://scontent.fash1-1.fna.fbcdn.net/hphotos-xta1/t31.0-8/12113502_10153109258402681_597414416482409143_o.jpg" />
        </div>
        <GithubActivities />
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
