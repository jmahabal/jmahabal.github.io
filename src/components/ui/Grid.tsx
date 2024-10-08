import styled, { css } from 'styled-components'
import { space } from 'styled-system'

const maxWidth = 1024
const desktopGutter = 48
const mobileGutter = 24

export const breakpoint = 768

const columnGap = 0.5 * desktopGutter
const rowGap = 0.5 * desktopGutter

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 320,
}

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${(breakpoint - 2 * desktopGutter - columnGap) / 2}px, 1fr)
  );
  grid-column-gap: ${columnGap}px;
  grid-row-gap: ${rowGap}px;
  ${space};
`

const OneColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-template-columns: minmax(auto, 800px);
  padding: 1em;
`
// ${media.tablet`padding: 2em 1em;`} FIXME:
// ${media.desktop`padding: 4em 1em;`} FIXME:

export { Page, TwoColumn, OneColumn }
