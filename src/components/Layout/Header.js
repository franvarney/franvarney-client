import React, {createClass} from 'react'
import {Link} from 'react-router'

import Logo from '../../assets/fv-logo-final.svg'

let Header = createClass({
  render() {
    return (
      <header>
        <Link to="/"><img src={Logo} /></Link>
      </header>
    )
  }
})

export default Header
