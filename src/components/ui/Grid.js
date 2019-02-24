import styled, { css } from 'styled-components';
import { space } from 'styled-system';

const maxWidth = 1024;
const desktopGutter = 48;
const mobileGutter = 24;

const breakpoint = 768;

const columnGap = 0.5 * desktopGutter;
const rowGap = 0.5 * desktopGutter;

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 320,
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

const TwoColumn = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${(breakpoint - 2 * desktopGutter - columnGap) / 2}px, 1fr));
    grid-column-gap: ${columnGap}px;
    grid-row-gap: ${rowGap}px;
    ${space};
`;

const Page = styled.div`
  grid-template-columns: minmax(auto, 800px);
  padding: 1em;
  ${media.tablet`padding: 2em 1em;`}
  ${media.desktop`padding: 4em 1em;`}
`;

export { Page, TwoColumn };
