import React from 'react';

let Linkk = React.createClass({
  render() {
    // console.log(1, this.props.link);
    let site = this.props.link[0];
    let url = this.props.link[1];
    return (
      <div className="link">
        <a href={ url }>{ site }</a>
      </div>
    );
  }
});

export default Linkk;
