import React from 'react'
import styled from 'styled-components'

import ProjectCard from './ProjectCard'
import { H1 } from './ui/Typography'
import { Page, TwoColumn } from './ui/Grid'
import { HomeLink } from './ui/HomeLink'

const Container = styled.div`
  display: grid;
  grid-row-gap: 40px;
`

const Links = () => {
  return (
    <Page>
      <TwoColumn>
        <Container>
          <H1>Talks</H1>
          <ProjectCard
            title="Variable Fonts @ WaffleJS"
            date="Jan. 2020"
            description="Variable fonts allow designers and developers to dynamically change various parameters of a typeface, going beyond commonly adjusted attributes like font-size and font-weight to attributes like y-ascender height and optical size. This can be a powerful tool and also lead to some fun use cases."
            ariaDescription="Variable Fonts"
            url="https://wafflejs.com/?day=2020-01-08"
            imageDescription="me, presenting, at wafflejs"
            imageUrl="wafflejs"
          />
          <HomeLink />
        </Container>
      </TwoColumn>
    </Page>
  )
}

export default Links
