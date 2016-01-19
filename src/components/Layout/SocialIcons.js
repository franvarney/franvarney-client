import React, {createClass} from 'react'
import {Link} from 'react-router'

import Config from '../../config'
import Facebook from '../../assets/icons/facebook.png'
import Github from '../../assets/icons/github.png'
import Linkedin from '../../assets/icons/linkedin.png'
import Twitter from '../../assets/icons/twitter.png'

let SocialIcons = createClass({
  render() {
    return (
      <div className="social-container container">
        <ul>
          <li><a href={Config.social.github}><img src={Github} /></a></li>
          <li><a href={Config.social.linkedin}><img src={Linkedin} /></a></li>
          <li><a href={Config.social.twitter}><img src={Twitter} /></a></li>
          <li><a href={Config.social.facebook}><img src={Facebook} /></a></li>
        </ul>
      </div>
    )
  }
})

export default SocialIcons
