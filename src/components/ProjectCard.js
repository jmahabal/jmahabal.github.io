import React, { Component } from 'react';
import { H1, H2, H4, H6, P } from './ui/Typography';
import { Card } from './ui/Cards';
import styled from 'styled-components';
import { space } from 'styled-system';

const FillerImage = styled.div`
  height: 60px;
  margin: 12px 0;
  background: repeating-linear-gradient(45deg, #95a5a6, #95a5a6 10px, #ecf0f1 10px, #ecf0f1 20px);
`;

class ProjectCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <H4>{this.props.title}</H4>
        <a href={this.props.url} target="_blank" rel="noopener" aria-label={this.props.ariaDescription}>
          {
            (this.props.imageUrl)
            ? <img alt={this.props.imageDescription} data-src={this.props.imageUrl} />
            : <FillerImage />
          }
        </a>
        <P>{this.props.description}</P>
      </Card>
    )
  }
}

export default ProjectCard;