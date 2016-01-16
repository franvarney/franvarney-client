import React, {createClass, PropTypes} from 'react'

import Post from './Post'

let BlogContainer = createClass({
  render() {
    return (
      <div className="blogs-container container">
        { this.props.posts.map((post, index) => {
          return <Post key={index} post={post} hasComments={false} />
        })}
      </div>
    )
  }
})

export default BlogContainer
