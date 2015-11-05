import React from 'react';

let Job = React.createClass({
  render() {
    let { company, title, date, bullets } = this.props.job;
    return (
      <div className="job">
        <h4>{ company }</h4> - <p className="date">{ date }</p>
        <p className="title">{ title }</p>
        <div id="tasks">
          <h5>Tasks:</h5>
          <ul>
            { bullets.map(function (bullet, index) {
              return <li className="bullet" key={ index }>{ bullet }</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
});

export default Job;
