import React, {createClass, PropTypes} from 'react'
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

    const monthNames =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday']

    date = new Date(date)
    return `${dayNames[date.getDay()]} ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  },

  render() {
    let {content, createdAt, slug, title} = this.props.post
    let header = (<h2>{title}</h2>)

    if (!this.props.hasComments) header = (<Link to={`/blog/${slug}`}><h2>{title}</h2></Link>)

    return (
      <div className="blog-post-container container">
        {header}
        <p className="date"><em>Posted on {this.formatDate(createdAt)}</em></p>
        <ReactMarkdown source={content || 'Loading...' } />
      </div>
    )
  }
})

export default BlogPost
