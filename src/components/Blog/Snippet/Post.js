import React, {createClass, PropTypes} from 'react'
import ReactMarkdown from 'react-markdown'

let BlogSnippetPost = createClass({
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
    let {createdAt, summary, slug, title} = this.props.post

    return (
      <div className="markdown-container container">
        <h4>{title}</h4>
        <p className="date"><em>Posted on {this.formatDate(createdAt)}</em></p>
        <div dangerouslySetInnerHTML={{ __html: summary }}></div>
      </div>
    )
  }
})

export default BlogSnippetPost
