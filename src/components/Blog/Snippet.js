import React, {createClass, PropTypes} from 'react'
import ReactMarkdown from 'react-markdown'

import FormatDate from '../../utils/format-date'
import LinkButton from '../Layout/LinkButton'

const BlogSnippetPost = createClass({
  render () {
    const {createdAt, summary, slug, title} = this.props.post

    return (
      <div id="blog-snippet" className="row dark">
        <div className="column">
          <h2 className="column">Blog</h2>
          {title &&
            <div className="markdown row">
              <h4>{title}</h4>
              <p className="date"><em>Posted on {FormatDate(createdAt)}</em></p>
              <div dangerouslySetInnerHTML={{ __html: summary }}></div>
            </div>
          }
          <div className="links row">
            {title && <LinkButton path={`/blog/${slug}`} text="Read More" />}
            <LinkButton path="/blog" text="View All" />
          </div>
        </div>
      </div>
    )
  }
})

BlogSnippetPost.displayName = 'BlogSnippetComponent'

BlogSnippetPost.propTypes = {
  post: PropTypes.shape({
    createdAt: PropTypes.string,
    slug: PropTypes.string,
    summary: PropTypes.string,
    title: PropTypes.string
  }).isRequired
}

export default BlogSnippetPost
