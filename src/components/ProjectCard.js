import React, { Component } from 'react';
import { H1, H2, H4, H6, P } from './ui/Typography';
import { Card } from './ui/Cards';
import styled from 'styled-components';

const FillerImage = styled.div`
  height: 75px;
  border: 1px black solid;
  background: repeating-linear-gradient(45deg, #95a5a6, #95a5a6 10px, #ecf0f1 10px, #ecf0f1 20px);
`;

const imageUrlBuilder = (name) => {
  return `./public/portfolio/resized/${name}.jpg`;
}

class ProjectCard extends Component {

  constructor(props) {
    super(props);
  }

  // TODO: pass in date created instead
  render() {
    return (
      <Card mb={3}>
        <H4 mb={3}>{this.props.title}</H4>
        <a className='portfolio-item' href={this.props.url} target="_blank" rel="noopener" aria-label={this.props.ariaDescription}>
          {
            (this.props.imageUrl)
            ? <img alt={this.props.imageDescription} src={imageUrlBuilder(this.props.imageUrl)} />
            : <FillerImage />
          }
        </a>
        <P mt={3}>{this.props.description}</P>
      </Card>
    )
  }
}

export default ProjectCard;