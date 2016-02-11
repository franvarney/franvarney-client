import React, {createClass} from 'react'
import Request from 'superagent'

import Blogs from '../../components/Blog/Container'
import Config from '../../config'
import DefaultLayout from '../../layouts/Default'

let BlogAll = createClass({
  getInitialState() {
    return {
      posts: []
    }
  },

  getPosts() {
    Request
      .get(`${Config.api.url}/posts`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) console.log(err)

        this.setState({
          posts: res.body
        })
      })
  },

  componentDidMount() {
    this.getPosts()
  },

  render() {
    return (
      <DefaultLayout clases="page-blogs">
        <Blogs posts={this.state.posts} />
      </DefaultLayout>
    )
  }
})

export default BlogAll
