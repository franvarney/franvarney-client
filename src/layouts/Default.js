import React, {createClass} from 'react'

import Header from '../components/header'

let DefaultLayout = createClass({
  render() {
    return (
      <div className={`${this.props.classes} page`}>
        <section className="one-fourth-col col">
          <Header />
        </section>
        <section className="three-fourth-col col">
          {this.props.children}
        </section>
      </div>
    )
  }
})

export default DefaultLayout
