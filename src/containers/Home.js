import React, {createClass} from 'react'
import {RouteHandler} from 'react-router'

import BlogSnippet from '../components/Blog/Snippet/Container'
import DefaultLayout from '../layouts/Default'
import GithubActivities from '../components/GithubActivities/Container'

let Home = createClass({
  render() {
    return (
      <DefaultLayout classes="page-home">
        <GithubActivities />
        <BlogSnippet />
      </DefaultLayout>
    )
  }
})

export default Home
