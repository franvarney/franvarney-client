import React, {createClass, PropTypes} from 'react'
import BarChart from 'react-bar-chart'

import Constants from '../constants'

const HEIGHT = 250
const MARGIN = {
  bottom: 30,
  left: 35,
  right: 30,
  top: 35
}
const MAX = 80
const MOBILE_MARGIN = {
  bottom: 20,
  left: 25,
  right: 0,
  top: 20
}

function formatActivities (activities) {
  const data = []

  function setTotal(total) {
    return parseInt(total) > MAX ? MAX : parseInt(total)
  }

  function parseDate (date) {
    const {abbreviatedMonthNames: abbr} = Constants
    date = new Date(date)
    return [`${abbr[date.getMonth()]}`, date.getFullYear()]
  }

  activities.forEach((activity) => {
    const [month, year] = parseDate(activity.date)
    const text = `${month.toUpperCase()} ${year}`
    data.push({ text, value: setTotal(activity.total) })
  })

  return data
}

const GithubActivityGraph = createClass({
  shouldComponentUpdate (nextProps) {
    return nextProps.width !== this.props.width ||
           nextProps.activities !== this.props.activities
  },

  render () {
    return (
      <BarChart
        ylabel='Activities'
        width={this.props.width}
        height={HEIGHT}
        margin={this.props.width < 769 ? MOBILE_MARGIN : MARGIN}
        data={formatActivities(this.props.activities)} />
    )
  }
})

GithubActivityGraph.displayName = 'GithubActivityGraphComponent'

GithubActivityGraph.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired
  })),
  width: PropTypes.number.isRequired
}

export default GithubActivityGraph
