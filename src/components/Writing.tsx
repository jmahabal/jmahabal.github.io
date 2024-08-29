import * as React from 'react'
import styled from 'styled-components'

import ProjectCard from './ProjectCard'
import { H1 } from './ui/Typography'
import { Page, TwoColumn } from './ui/Grid'
import { HomeLink } from './ui/HomeLink'

const Container = styled.div`
  display: grid;
  grid-row-gap: 40px;
`

const Writing = () => {
  return (
    <Page>
      <TwoColumn>
        <Container>
          <H1>Writing</H1>
          <ProjectCard
            title="Growing a UX Writing Practice"
            date="Jan. 2022"
            description="You can push forward your culture without waiting for someone to be responsible full-time. These are some of the strategies that worked for us at Lattice!"
            ariaDescription="Growing a UX Writing Practice"
            url="https://tech.lattice.com/article/growing-a-ux-writing-practice"
            imageDescription="stock illustration of a figure holding a massive pencil"
            imageUrl="uxwriting"
          />
          <HomeLink />
        </Container>
      </TwoColumn>
    </Page>
  )
}

export default Writing
