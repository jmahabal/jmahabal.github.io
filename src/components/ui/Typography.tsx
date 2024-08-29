import styled from 'styled-components'
import { space } from 'styled-system'

const sansserif = 'Inter, sans-serif'
const serif = 'Tangerine, serif'
const monospace = 'Inconsolata, monospace'

const maxTextWidth = '55ch'

export const Text = styled.span`
  font-weight: normal;
  font-family: ${sansserif};
  line-height: 1.4;
  max-width: ${maxTextWidth};
  display: inherit;
  margin-top: 0;
  margin-bottom: 0;
  ${space};
`

const H1 = styled(Text).attrs({ as: 'h1'})`
    font-size: 36px;
`

const H2 = styled(Text).attrs({ as: 'h2'})`
    font-size: 30px;
`

const H3 = styled(Text).attrs({ as: 'h3'})`
    font-size: 24px;
`

const H4 = styled(Text).attrs({ as: 'h4'})`
    font-size: 18px;
`

const H6 = styled(Text).attrs({ as: 'h6'})`
    font-size: 16px;
`

const P = styled(Text).attrs({ as: 'p' })`
    font-size: 14px;
    font-family: ${monospace};
`

const Span = styled.span`
  ${space};
`

export { H1, H2, H3, H4, H6, P, Span, sansserif, serif, monospace }
