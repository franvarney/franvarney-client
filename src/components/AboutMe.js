import React, {createClass} from 'react'

const AboutMe = createClass({
  render() {
    return (
      <div className="about-me-container container">
        <h2>About Me</h2>
        <p>Hi! I'm Fran Varney. I'm currently a software engineer at Modulus.</p>
        <p>I grew up loving art and started on a path to photography, but after
        taking a programming class for fun, I ended up loving it and made my move
        into development.</p>
        <p>In my free time I still love photography, along with drooling over
        mechanical keyboards and playing video games.</p>
      </div>
    )
  }
})

AboutMe.displayName = 'AboutMeComponent'

export default AboutMe
