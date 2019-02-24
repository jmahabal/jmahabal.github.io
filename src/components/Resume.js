import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { H3 } from './ui/Typography';
import { Page } from './ui/Grid';

const ResumeContainer = styled.div`
  border: 1px black solid;
`;

const ResumeImage = styled.img`
  width: 100%;
  max-width: 800px;
`;

const Resume = ({ imageDescription }) => {
  return (
    <Page>
      <ResumeContainer>
        <ResumeImage alt={imageDescription} src="./public/resume/resume_jaymahabal.jpg" />
      </ResumeContainer>
      <div className="to-home">
        <Link to="/">Home</Link>
      </div>
    </Page>
  );
};

export default Resume;
