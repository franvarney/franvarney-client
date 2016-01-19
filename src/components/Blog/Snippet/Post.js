import React, {createClass, PropTypes} from 'react'
import ReactMarkdown from 'react-markdown'

let BlogSnippetPost = createClass({
  getInitialState() {
    return {
      post: {}
    }
  },

  render() {
    let {summary, slug, title} = this.props.post

    return (
      <div className="markdown-container container">
        <h4>{title}</h4>
        <div dangerouslySetInnerHTML={{ __html: summary }}></div>
      </div>
    )
  }
})

export default BlogSnippetPost
