import styled from 'styled-components';
import { space } from 'styled-system';

const maxWidth = 1024;
const desktopGutter = 48;
const mobileGutter = 24;

const breakpoint = 768;

const columnGap = 50;

const TwoColumn = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${(breakpoint - 2*desktopGutter - columnGap) / 2}px, 1fr));
    grid-column-gap: ${columnGap}px;
    ${space};
`;  

export { TwoColumn }