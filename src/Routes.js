import {createHashHistory} from 'history'
import React from 'react'
import {render} from 'react-dom'
import {IndexRoute, Route, Router, useRouterHistory} from 'react-router'

import App from './containers/App'
import Blogs from './containers/Blog/All'
import BlogShow from './containers/Blog/Show'
import CSS from './styles/index.styl'
import Home from './containers/Home'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

let routes = (
  <Router history={appHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="blog" component={Blogs} />
      <Route path="blog/:slug" component={BlogShow} />
    </Route>
  </Router>
)

render(routes, document.getElementById('root'))
