import React, {createClass} from 'react'
import Request from 'superagent'

import BlogPost from '../../components/Blog/Post'
import Config from '../../config'
import DefaultLayout from '../../layouts/Default'
import {Post} from '../../utils/sdk'

const BlogAll = createClass({
  getInitialState () {
    return {
      error: null,
      posts: []
    }
  },

  getPosts () {
    this.setState({ error: null })
    Post.getAll((err, posts) => {
      if (err) return this.setState({ error: err })
      this.setState({ posts })
    })
  },

  componentDidMount () {
    this.getPosts()
  },

  render () {
    const {posts} = this.state

    return (
      <DefaultLayout classes="page-blogs">
        <div className="blogs-container container">
          {!posts || !posts.length && <div className="blog-post row">Loading...</div>}
          {posts && posts.map((post, index) => {
            return <BlogPost key={index} post={post} hasComments={false} />
          })}
        </div>
      </DefaultLayout>
    )
  }
})

BlogAll.displayName = 'BlogAllContainer'

export default BlogAll
