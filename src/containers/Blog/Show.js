import React, {createClass} from 'react'
import Request from 'superagent'

import BlogPost from '../../components/Blog/Post'
import Config from '../../config'
import DefaultLayout from '../../layouts/Default'

const BlogShow = createClass({
  getInitialState () {
    return {
      post: undefined,
      slug: this.props.params.slug
    }
  },

  getPost () {
    Request
      .get(`${Config.api.url}/posts/${this.state.slug}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) console.log(err)
        this.setState({ post: res.body })
      })
  },

  componentDidMount () {
    this.getPost()
  },

  render () {
    return (
      <DefaultLayout classes="page-blog-show">
        <BlogPost post={this.state.post} hasComments={true} />
      </DefaultLayout>
    )
  }
})

BlogShow.displayName = 'BlogShowContainer'

export default BlogShow
