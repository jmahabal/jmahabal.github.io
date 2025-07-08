import styled from 'styled-components'
import { Page, OneColumn } from './ui/Grid'
import { HomeLink } from './ui/HomeLink'

const ResumeContainer = styled.div`
  border: 1px black solid;
  margin: 40px 0;
`

const ResumeImage = styled.img`
  width: 100%;
  max-width: 800px;
`

const Resume = () => {
  return (
    <Page>
      <OneColumn>
        <ResumeContainer>
          <ResumeImage src="/resume/resume_jaymahabal.jpg" />
          {/* <object
            type="application/pdf"
            data="/resume/resume_jaymahabal.pdf"
          ></object> */}
        </ResumeContainer>
        <HomeLink />
      </OneColumn>
    </Page>
  )
}

export default Resume
