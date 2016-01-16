import React, {createClass, PropTypes} from 'react'
import ReactMarkdown from 'react-markdown'
import {Link} from 'react-router'

let BlogPost = createClass({
  getInitialState() {
    return {
      post: {}
    }
  },

  render() {
    let {caption, content, slug, title} = this.props.post
    let header = (<h2>{title}</h2>)

    if (!this.props.hasComments) header = (<Link to={`/blog/${slug}`}><h2>{title}</h2></Link>)

    return (
      <div className="blog-post-container container">
        {header}
        <h5><q>{caption}</q></h5>
        <ReactMarkdown source={content} />
      </div>
    )
  }
})

export default BlogPost
