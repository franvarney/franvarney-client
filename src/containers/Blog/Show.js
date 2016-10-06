import React, {createClass} from 'react'
import Request from 'superagent'

import BlogPost from '../../components/Blog/Post'
import Config from '../../config'
import DefaultLayout from '../../layouts/Default'
import {Post} from '../../utils/sdk'

const BlogShow = createClass({
  getInitialState () {
    return {
      error: null,
      post: null,
      slug: this.props.params.slug
    }
  },

  getPost () {
    this.setState({ error: null })

    Post.get(this.state.slug, (err, post) => {
      if (err) {
        if (err === 'Not found') return window.location = '/not-found'
        return this.setState({ error: err })
      }
      this.setState({ post })
    })
  },

  componentDidMount () {
    this.getPost()
  },

  render () {
    return (
      <DefaultLayout classes="page-blog-show blog">
        <BlogPost
          post={this.state.post}
          hasComments={true}
          editing={false} />
      </DefaultLayout>
    )
  }
})

BlogShow.displayName = 'BlogShowContainer'

export default BlogShow
