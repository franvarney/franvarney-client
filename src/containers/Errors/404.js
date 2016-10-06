import React, {createClass, PropTypes} from 'react'

import DefaultLayout from '../../layouts/Default'

const NotFound = createClass({
  render () {
    return (
      <DefaultLayout classes="page-error-not-found">
        <div id="error" className="column half">
          <h1 className="error large">404</h1>
          <hr className="divider" />
          <p className="error small">Not Found!</p>
        </div>
      </DefaultLayout>
    )
  }
})

NotFound.displayName = 'NotFoundContainer'

export default NotFound
