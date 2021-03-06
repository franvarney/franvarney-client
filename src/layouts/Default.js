import React, {createClass} from 'react'

import Header from '../components/Layout/Header'
import Navigation from '../components/Layout/Navigation'
import SocialIcons from '../components/Layout/SocialIcons'

const DefaultLayout = createClass({
  render () {
    return (
      <div className={`${this.props.classes} page row`}>
        <section className="one-fourth column light">
          <Header />
          <Navigation />
          <SocialIcons />
        </section>
        <section className="three-fourth column white">
          {this.props.children}
        </section>
      </div>
    )
  }
})

DefaultLayout.displayName = 'DefaultLayout'

export default DefaultLayout
