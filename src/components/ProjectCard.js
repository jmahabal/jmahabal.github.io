import React from 'react';
import styled from 'styled-components';
import { H4, P } from './ui/Typography';
import { Card } from './ui/Cards';

const FillerImage = styled.div`
  height: 75px;
  border: 1px black solid;
  background: repeating-linear-gradient(
    45deg,
    #95a5a6,
    #95a5a6 10px,
    #ecf0f1 10px,
    #ecf0f1 20px
  );
`;

const imageUrlBuilder = name => `./public/portfolio/resized/${name}.jpg`;

const ProjectCard = (props) => {
  // TODO: pass in date created instead
  const {
    url,
    title,
    ariaDescription,
    imageUrl,
    imageDescription,
    description,
  } = props;

  return (
    <Card mb={3}>
      <H4 mb={3}>{title}</H4>
      <a
        className="portfolio-item"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaDescription}
      >
        {imageUrl ? (
          <img
            alt={imageDescription}
            src={imageUrlBuilder(imageUrl)}
          />
        ) : (
          <FillerImage />
        )}
      </a>
      <P mt={3}>{description}</P>
    </Card>
  );
};

export default ProjectCard;
