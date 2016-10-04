import React, {createClass, PropTypes} from 'react'
import ReactDisqusThread from 'react-disqus-thread'
import ReactMarkdown from 'react-markdown'
import {Link} from 'react-router'

import FormatDate from '../../utils/format-date'

const BlogPost = createClass({
  getDefaultProps() {
    return {
      editing: false,
      hasComments: false,
      post: {}
    }
  },

  shouldComponentUpdate (nextProps) {
    return (nextProps.post !== this.props.post) || // for showing post
           (this.props.editing && nextProps.post === this.props.post) // for creating post
  },

  render () {
    const {editing, hasComments, post} = this.props
    const {
      category, content, createdAt, _id,
      isHtml=false, slug, tags=[], title
    } = post

    return (
      <div className="blog-post row">
        {(hasComments || editing) && <h2>[{category}] {title}</h2>}
        {(!hasComments && !editing) &&
          <Link to={`/blog/${slug}`}>
            <h2>[{category}] {title}</h2>
          </Link>
        }
        {createdAt &&
          <p className="date">
            <em>Posted on {FormatDate(createdAt)}</em>
          </p>
        }
        {!post.isHtml && <ReactMarkdown source={content} />}
        {post.isHtml && <div dangerouslySetInnerHTML={{ __html: content }}></div>}
        {tags.length > 0 && <p>Tags: {tags.join(', ')}</p>}
        {(hasComments && !editing) &&
          <ReactDisqusThread
            shortname="franvarney"
            identifier={_id}
            title={title} />
        }
      </div>
    )
  }
})

BlogPost.displayName = 'BlogPostComponent'

BlogPost.propTypes = {
  editing: PropTypes.bool,
  hasComments: PropTypes.bool,
  post: PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    isHtml: PropTypes.bool,
    slug: PropTypes.string,
    tags: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  })
}

export default BlogPost
