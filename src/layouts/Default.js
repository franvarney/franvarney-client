import React, {createClass} from 'react'

import Header from '../components/Layout/Header'
import SocialIcons from '../components/Layout/SocialIcons'

let DefaultLayout = createClass({
  render() {
    return (
      <div className={`${this.props.classes} page`}>
        <section className="one-fourth-col col">
          <Header />
          <SocialIcons />
        </section>
        <section className="three-fourth-col col">
          {this.props.children}
        </section>
      </div>
    )
  }
})

export default DefaultLayout
