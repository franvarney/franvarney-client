import Masonry from 'react-masonry-component'
import React, {createClass} from 'react'
import Request from 'superagent'

import Config from '../config'
import DefaultLayout from '../layouts/Default'
import Photo from '../components/Photo.js'

function hasMore (currentPage, totalPages) {
  return Number(currentPage) < Number(totalPages)
}

const Photos = createClass({
  getInitialState () {
    return {
      hasMore: true,
      isMobile: window.matchMedia('screen and (max-width: 415px)').matches || false,
      limit: 5,
      page: 1,
      photos: []
    }
  },

  getPhotos () {
    const {limit, page, photos: currentPhotos} = this.state

    Request
      .get(`${Config.api.url}/photos`)
      .query({ limit })
      .query({ page })
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        if (err) console.log(err)

        const {body} = response || {}
        const {
          page: currentPage=1,
          pages: totalPages=1,
          photo: photos=[]
        } = body.photos || {}

        this.setState({
          hasMore: hasMore(currentPage, totalPages),
          page: currentPage + 1,
          photos: currentPhotos.concat(photos)
        })
      })
  },

  componentDidMount () {
    this.getPhotos()
  },

  render () {
    const {hasMore, isMobile, photos} = this.state
    const options = {}

    return (
      <DefaultLayout classes="page-photos">
        <Masonry
          className={'photos'}
          elementType={'div'}
          options={options}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}>
          {photos.map((photo, index) => {
            return <Photo key={index} photo={photo} isMobile={isMobile} />
          })}
        </Masonry>
        {hasMore &&
          <div id="button" className="link-button dark fixed">
            <a onClick={this.getPhotos}>Load More &raquo;</a>
          </div>}
      </DefaultLayout>
    )
  }
})

Photos.displayName = 'PhotosContainer'

export default Photos
