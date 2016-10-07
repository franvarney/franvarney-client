import React, {Component} from 'react'

import LinkButton from './LinkButton'

class Navigation extends Component {
  render () {
    return (
      <nav className="navigation">
        <hr />
        <ul>
          <li>
            <LinkButton hasArrow={false} path="/blog" text="Blog" />
          </li>
          <li>
            <LinkButton hasArrow={false} path="/photos" text="Photos" />
            </li>
          <li>
            <LinkButton hasArrow={false} path="/map" text="Map" />
          </li>
        </ul>
        <hr />
      </nav>
    )
  }
}

Navigation.displayName = 'NavigationComponent'

export default Navigation
