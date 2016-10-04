import React from 'react'
import {render} from 'react-dom'
import {browserHistory, IndexRoute, Route, Router} from 'react-router'

import App from './containers/App'
import Blogs from './containers/Blog/All'
import BlogCreate from './containers/Blog/Create'
import BlogShow from './containers/Blog/Show'
import Checkin from './containers/Checkin'
import CSS from './styles/index.styl'
import Home from './containers/Home'
import GoogleMap from './containers/Map'
import Photos from './containers/Photos'
import Resume from './containers/Resume'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="blog" component={Blogs} />
      <Route path="blog/create" component={BlogCreate} />
      <Route path="blog/:slug" component={BlogShow} />
      <Route path="checkin" component={Checkin} />
      <Route path="photos" component={Photos} />
      <Route path="resume" component={Resume} />
      <Route path="map" component={GoogleMap} />
    </Route>
  </Router>
)

render(routes, document.getElementById('root'))
