import React from 'react';

import Linkk from './link';
import LinkData from 'json!../data/links';

let Links = React.createClass({
  render() {
    let LinkKeys = Object.keys(LinkData);
    return (
      <div>
        <div id="link-list">
          <ul>
            { LinkKeys.map(function (link, index) {
              let linkk = [link, LinkData[link]];
              return <li key={ index }><Linkk link={ linkk } /></li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
});

export default Links;
