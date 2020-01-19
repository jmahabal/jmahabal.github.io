import React from 'react'
import styled from 'styled-components'
import { Page } from './ui/Grid'
import { HomeLink } from './ui/HomeLink'

const ResumeContainer = styled.div`
  border: 1px black solid;
  margin: 40px 0;
`

const ResumeImage = styled.img`
  width: 100%;
  max-width: 800px;
`

const Resume = ({ imageDescription }) => {
  return (
    <Page>
      <ResumeContainer>
        <ResumeImage
          alt={imageDescription}
          src="./public/resume/resume_jaymahabal.jpg"
        />
      </ResumeContainer>
      <HomeLink />
    </Page>
  )
}

export default Resume
