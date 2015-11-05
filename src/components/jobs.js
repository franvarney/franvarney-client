import React from 'react';

import Job from './job';
import JobData from 'json!../data/jobs';

let Jobs = React.createClass({
  render() {
    return (
      <div>
        <h2>Experience</h2>
        <div id="job-list">
          <ul>
            { JobData.map(function (job, index) {
              return <li key={ index }><Job job={ job } /></li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
});

export default Jobs;
