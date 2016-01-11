import React, {createClass} from 'react'

import Logo from '../assets/fv.png'

let Header = createClass({
  render() {
    return (
      <header>
        <img src={Logo} />
      </header>
    )
  }
})

export default Header
