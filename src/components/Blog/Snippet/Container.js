import React, {createClass} from 'react'
import {Link} from 'react-router'
import Request from 'superagent'

import Config from '../../../config'
import BlogSnippetPost from './Post'

let BlogSnippetContainer = createClass({
  getInitialState() {
    return {
      post: []
    }
  },

  getLatestPost() {
    Request
      .get(`${Config.api.url}/posts?auth_token=${Config.api.token}&latest=true`)
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
    return (
      <div className="blog-snippet-container container">
        <h2>Writings</h2>
        <BlogSnippetPost post={this.state.post} />
        <div>
          <span><Link to={`/blog/${this.state.post.slug}`}>Read More >></Link></span>
          <span><Link to="/blog">View All>></Link></span>
        </div>
      </div>
    )
  }
})

export default BlogSnippetContainer
