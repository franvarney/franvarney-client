import React, {createClass} from 'react'
import Request from 'superagent'

import BlogPost from '../../components/Blog/Post'
import Config from '../../config'
import DefaultLayout from '../../layouts/Default'

let BlogShow = createClass({
  getInitialState() {
    return {
      post: {},
      slug: this.props.params.slug
    }
  },

  getPost() {
    Request
      .get(`${Config.api.url}/posts/${this.state.slug}?auth_token=${Config.api.token}`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) console.log(err)

        this.setState({
          post: JSON.parse(res.text)
        })
      })
  },

  componentDidMount() {
    this.getPost()
  },

  render() {
    return (
      <DefaultLayout clases="page-blog-show">
        <BlogPost post={this.state.post} hasComments={true} />
      </DefaultLayout>
    )
  }
})

export default BlogShow