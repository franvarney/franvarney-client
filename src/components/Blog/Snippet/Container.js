import React, {createClass} from 'react'

import Request from 'superagent'

import Config from '../../../config'
import BlogSnippetPost from './Post'
import LinkButton from '../../Layout/LinkButton'

let BlogSnippetContainer = createClass({
  getInitialState() {
    return {
      post: []
    }
  },

  getLatestPost() {
    Request
      .get(`${Config.api.url}/posts?latest=true`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) console.log(err)

        this.setState({
          post: JSON.parse(res.text)[0]
        })
      })
  },

  componentDidMount() {
    this.getLatestPost()
  },

  render() {
    const {post} = this.state

    return (
      <div className="blog-snippet-container container">
        <h2>Writings</h2>
        <BlogSnippetPost post={post} />
        <div className="link-button-container container">
          <LinkButton path={`/blog/${post.slug}`} text="Read More" />
          <LinkButton path="/blog" text="View All" />
        </div>
      </div>
    )
  }
})

export default BlogSnippetContainer
