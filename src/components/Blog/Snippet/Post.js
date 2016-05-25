import React, {createClass, PropTypes} from 'react'
import ReactMarkdown from 'react-markdown'

import FormatDate from '../../../utils/format-date'

let BlogSnippetPost = createClass({
  getInitialState() {
    return {
      post: {}
    }
  },

  render() {
    let {createdAt, summary, slug, title} = this.props.post

    return (
      <div className="markdown-container container">
        <h4>{title}</h4>
        <p className="date"><em>Posted on {FormatDate(createdAt)}</em></p>
        <div dangerouslySetInnerHTML={{ __html: summary }}></div>
      </div>
    )
  }
})

export default BlogSnippetPost
