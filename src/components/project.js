import React from 'react';

let Project = React.createClass({
  enlargeImg (event) {
    let imgSrc = event.target.src;
    let modal = document.getElementById('modal');
    modal.style.display = 'block';
    document.getElementById('modal-image').src = imgSrc;
  },

  render() {
    let { name, date, description, bullets, used, images } = this.props.project;
    let usedText = date === 'Current' ? 'Using' : 'Used';
    let self = this;
    return (
      <div className="project">
        <h4>{ name }</h4> - <p className="date">{ date }</p>
        <p className="description">Description: { description }</p>
        <p>{ usedText }: { used }</p>
        <div id="tasks">
          <h5>Tasks:</h5>
          <ul>
            { bullets.map(function (bullet, index) {
              return <li className="bullet" key={ index }>{ bullet }</li>;
            })}
          </ul>
        </div>
        <div id="images">
          <ul>
            { images.map(function (image, index) {
              return <li onClick={ self.enlargeImg } className="image" key={ index }><img src={ "/img/" + image } /></li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
});

export default Project;
