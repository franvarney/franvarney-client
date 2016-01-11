import createBrowserHistory from 'history/lib/createBrowserHistory'
import React from 'react'
import {render} from 'react-dom'
import {Route, Router} from 'react-router'

import App from './containers/App'
import CSS from './styles/index.styl'

let routes = (
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App} />
  </Router>
)

render(routes, document.getElementById('root'))
