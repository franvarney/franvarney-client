import React, {createClass, PropTypes} from 'react'
import ReactDisqusThread from 'react-disqus-thread'
import ReactMarkdown from 'react-markdown'
import {Link} from 'react-router'

let BlogPost = createClass({
  getInitialState() {
    return {
      post: {}
    }
  },

  formatDate(date) {
    if (date === 'Present') return date

    const monthNames =['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December']

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday']

    date = new Date(date)
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  },

  render() {
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
        <p className="date"><em>Posted on {this.formatDate(createdAt)}</em></p>
        <ReactMarkdown source={content || 'Loading...' } />
        {comments}
      </div>
    )
  }
})

export default BlogPost
