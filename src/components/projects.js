import React from 'react';

import Project from './project';
import ProjectData from 'json!../data/projects';

let Projects = React.createClass({
  render() {
    return (
      <div>
        <h2>Projects</h2>
        <div id="project-list">
          <ul>
            { ProjectData.map(function (project, index) {
              return <li key={ index }><Project project={ project } /></li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
});

export default Projects;
