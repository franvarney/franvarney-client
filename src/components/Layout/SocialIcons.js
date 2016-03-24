import React, {createClass} from 'react'
import {Link} from 'react-router'

import Config from '../../config'
import Facebook from '../../assets/icons/facebook.svg'
import Github from '../../assets/icons/github.svg'
import Linkedin from '../../assets/icons/linkedin.svg'
import Twitter from '../../assets/icons/twitter.svg'

let SocialIcons = createClass({
  render() {
    return (
      <div className="social-container container">
        <ul>
          <li><a href={Config.social.github} target="_blank"><img src={Github} /></a></li>
          <li><a href={Config.social.linkedin} target="_blank"><img src={Linkedin} /></a></li>
          <li><a href={Config.social.twitter} target="_blank"><img src={Twitter} /></a></li>
          <li><a href={Config.social.facebook} target="_blank"><img src={Facebook} /></a></li>
        </ul>
      </div>
    )
  }
})

export default SocialIcons
