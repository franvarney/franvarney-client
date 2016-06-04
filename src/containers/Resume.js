import React, {createClass} from 'react'

import Config from '../config'
import DefaultLayout from '../layouts/Default'

let Resume = createClass({
  render() {
    return (
      <DefaultLayout classes="page-resume">
        <div className="link-button dark">
          <a href={`https://docs.google.com/document/d/${Config.fileId}/export?format=pdf`}>Download &raquo;</a>
        </div>
        <div className="iframe-container container">
          <iframe src={`https://docs.google.com/document/d/${Config.fileId}/pub?embedded=true`}></iframe>
        </div>
      </DefaultLayout>
    )
  }
})

export default Resume
