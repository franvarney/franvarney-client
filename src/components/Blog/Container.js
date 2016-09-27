import React, {createClass} from 'react'

import Post from './Post'

const Blog = createClass({
  render () {
    return (
      <div className="blogs-container container">
        { this.props.posts.map((post, index) => {
          return <Post key={index} post={post} hasComments={false} />
        })}
      </div>
    )
  }
})

Blog.displayName = 'BlogContainer'

export default Blog
