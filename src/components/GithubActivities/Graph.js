import React, {createClass} from 'react'
import D3, {AreaChart} from 'react-d3'

let GithubActivityGraph = createClass({
  getInitialState() {
    return {
      width: this.props.width
    }
  },

  render() {
    let areaData = [{
      name: "Activities",
      values: this.props.activities
    }]

    return (
      <AreaChart
        data={areaData}
        width={this.props.width}
        height={175}
        xAxisLabel="Day"
        yAxisLabel="Activities"
        xAxisTickInterval={{ unit: "weeks", interval: 2 }}
        xAccessor={(d) => new Date(d[0])}
        yAccessor={(d) => d[1]} />
    )
  }
})

export default GithubActivityGraph
