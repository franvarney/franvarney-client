import React, {createClass, PropTypes} from 'react'

const MarkerDetails = createClass({
  closeModal(e) {
    e.target.parentNode.parentNode.style.display = 'none'
  },

  render() {
    return (
      <div id="marker-details-modal">
        <h4 />
        <span />
        <span onClick={this.closeModal}
              id="marker-details-close"
              dangerouslySetInnerHTML={{ __html: '<a>&#10006;</a>' }} />
      </div>
    )
  }
})

MarkerDetails.displayName = 'MarkerDetails'

export default MarkerDetails
