import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'

import { Arrow } from './Icons'

const LinkContainer = styled.div`
  a {
    display: flex;
    align-items: center;
    color: black;
    font-size: 20px;
    text-decoration: none;
  }
  a svg {
    transform: rotate(180deg);
  }
  @media (prefers-reduced-motion: no-preference) {
    a svg {
      transition: 0.25s transform;
    }
    a:hover svg {
      transform: translateX(-5px) rotate(180deg);
    }
  }
`
export const HomeLink = () => {
  return (
    <LinkContainer>
      <Link to="/">
        <Arrow />
        Home
      </Link>
    </LinkContainer>
  )
}
