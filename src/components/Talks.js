import React from 'react'
import styled from 'styled-components'

import ProjectCard from './ProjectCard'
import { H1 } from './ui/Typography'
import { Page, TwoColumn, breakpoint } from './ui/Grid'
import { HomeLink } from './ui/HomeLink'

const Container = styled.div`
  display: grid;
  gap: 40px;
  flex-direction: column;
  width: 100%;
  max-width: ${breakpoint}px;
`

const Links = () => {
  return (
    <Page>
      <Container>
        <H1>Talks</H1>
        <TwoColumn>
          <ProjectCard
            title="Variable Fonts @ WaffleJS"
            date="Jan. 2020"
            description="Variable fonts allow designers and developers to dynamically change various parameters of a typeface, going beyond commonly adjusted attributes like font-size and font-weight to attributes like y-ascender height and optical size. This can be a powerful tool and also lead to some fun use cases."
            ariaDescription="Variable Fonts"
            url="https://wafflejs.com/?day=2020-01-08"
            imageDescription="me, presenting, at wafflejs"
            imageUrl="wafflejs"
          />
          <ProjectCard
            title="Eng. <> Product @ ProductTank NYC"
            date="Sept. 2022"
            description="Product and engineering work together to solve problems and make the most excellent tech on the market, but when incentives are unclear, what can be a wonderful relationship gets contentious. That's why Product Tank NYC has partnered with the team at Lattice to discuss managing your relationship with your engineering team."
            ariaDescription="Managing the Engineering and Product Manager Partnership"
            url="https://www.meetup.com/producttanknyc/events/288182632/"
          />
        </TwoColumn>
        <HomeLink />
      </Container>
    </Page>
  )
}

export default Links
