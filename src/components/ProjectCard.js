import React, { Component } from 'react';

class ProjectCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class='portfolio-item'>
        <div class="portfolio-item-title">{this.props.title}</div>
        <a href={this.props.url} target="_blank" rel="noopener" aria-label={this.props.ariaDescription}>
          <img alt={this.props.imageDescription} data-src={this.props.imageUrl} />
        </a>
        <div class="portfolio-item-text">{this.props.description}</div>
      </div>
    )
  }
}

export default ProjectCard;