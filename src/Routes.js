import {createHistory} from 'history'
import React from 'react'
import {render} from 'react-dom'
import {IndexRoute, Route, Router, useRouterHistory} from 'react-router'

import App from './containers/App'
import Blogs from './containers/Blog/All'
import BlogShow from './containers/Blog/Show'
import Checkin from './containers/Checkin'
import CSS from './styles/index.styl'
import Home from './containers/Home'
import GoogleMap from './containers/Map'
import Resume from './containers/Resume'

let routes = (
  <Router history={createHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="blog" component={Blogs} />
      <Route path="blog/:slug" component={BlogShow} />
      <Route path="resume" component={Resume} />
      <Route path="checkin" component={Checkin} />
      <Route path="map" component={GoogleMap} />
    </Route>
  </Router>
)

render(routes, document.getElementById('root'))
