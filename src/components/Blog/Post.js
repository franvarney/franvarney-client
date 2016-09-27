import React, {createClass} from 'react'
import ReactDisqusThread from 'react-disqus-thread'
import ReactMarkdown from 'react-markdown'
import {Link} from 'react-router'

import FormatDate from '../../utils/format-date'

const BlogPost = createClass({
  getInitialState () {
    return {
      post: {}
    }
  },

  render () {
    let {content, createdAt, _id, slug, title} = this.props.post
    let header = (<h2>{title}</h2>), comments = null

    if (!this.props.hasComments) header = (<Link to={`/blog/${slug}`}><h2>{title}</h2></Link>)
    if (this.props.hasComments) comments = (<ReactDisqusThread
                                  shortname="franvarney"
                                  identifier={_id}
                                  title={title} />)

    return (
      <div className="blog-post-container container">
        {header}
        <p className="date"><em>Posted on {FormatDate(createdAt)}</em></p>
        <ReactMarkdown source={content || 'Loading...' } />
        {comments}
      </div>
    )
  }
})

BlogPost.displayName = 'BlogPostComponent'

export default BlogPost
