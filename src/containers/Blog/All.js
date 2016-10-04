import React, {createClass} from 'react'
import Request from 'superagent'

import Post from '../../components/Blog/Post'
import Config from '../../config'
import DefaultLayout from '../../layouts/Default'

const BlogAll = createClass({
  getInitialState () {
    return {
      posts: []
    }
  },

  getPosts () {
    Request
      .get(`${Config.api.url}/posts`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) console.log(err)
        this.setState({ posts: res.body })
      })
  },

  componentDidMount () {
    this.getPosts()
  },

  render () {
    return (
      <DefaultLayout classes="page-blogs">
        <div className="blogs-container container">
          {this.state.posts.map((post, index) => {
            return <Post key={index} post={post} hasComments={false} />
          })}
        </div>
      </DefaultLayout>
    )
  }
})

BlogAll.displayName = 'BlogAllContainer'

export default BlogAll
