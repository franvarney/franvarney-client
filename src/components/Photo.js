import React, {createClass, PropTypes} from 'react'
import {Link} from 'react-router'

function useMobileImage (isMobile) {
  return isMobile ? '_m' : ''
}

function formatImageUrl (photo, isMobile=false) {
  const {farm, id, secret, server} = photo
  const mobile = useMobileImage(isMobile)
  return `https://farm${farm}.static.flickr.com/${server}/${id}_${secret}${mobile}.jpg`
}

function formatUrl (id, owner) {
  return `https://www.flickr.com/photos/${owner}/${id}`
}

const Photo = createClass({
  getDefaultProps () {
    return {
      isMobile: false,
      photo: {}
    }
  },

  render () {
    const {isMobile, photo} = this.props
    const {id, owner} = photo

    return (
      <a href={formatUrl(id, owner)} target="_window">
        <img src={formatImageUrl(photo, isMobile)} />
      </a>
    )
  }
})

Photo.displayName = 'PhotoComponent'

Photo.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    farm: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    secret: PropTypes.string.isRequired,
    server: PropTypes.string.isRequired
  })
}

export default Photo
