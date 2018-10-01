import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { H3 } from './ui/Typography';
import { Page } from './ui/Grid';
import styled from 'styled-components';

const ResumeContainer = styled.div`
  border: 1px black solid;
`;

const ResumeImage = styled.img`
  width: 100%;
  max-width: 800px;
`;

class Resume extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page>
        <ResumeContainer>
          <ResumeImage alt={this.props.imageDescription} src='./public/resume/resume_jaymahabal.jpg' />
        </ResumeContainer>
        <div className="to-home">
          <Link to="/">Home</Link>
        </div>
      </Page>
    )
  }
}

export default Resume;