import * as React from 'react'
import styled from 'styled-components'
import { Page, OneColumn } from './ui/Grid'
import { HomeLink } from './ui/HomeLink'

const MTALanguageContainer = styled.div`
  padding: 16px 64px;
`

const MTALanguageImage = styled.img`
  max-height: 800px;
  border: 1px black solid;
`

const TextContainer = styled.div`
  margin: auto;
  max-width: 60ch;
`

const MTALanguage = () => {
  return (
    <Page>
      <OneColumn>
        <MTALanguageContainer>
          <MTALanguageImage src="./public/mta-language.png" />
        </MTALanguageContainer>
        <TextContainer>
          <HomeLink />
        </TextContainer>
      </OneColumn>
    </Page>
  )
}

export default MTALanguage
