import styled from 'styled-components';
import { space } from 'styled-system';

const sansserif = `"Asap", sans-serif`;
const serif = `"Tangerine", serif`;
const monospace = `"Inconsalata", monospace`;

const maxTextWidth = `45ch`;

const Text = styled.span`
    font-weight: normal;
    margin: 0;
    font-family: ${sansserif};
    line-height: 1.4;
    max-width: ${maxTextWidth};
    display: inherit;
    ${space};
`;

const H1 = Text.withComponent('h1').extend`
    font-size: 36px;
`;

const H2 = Text.withComponent('h2').extend`
    font-size: 30px;
`;

const H3 = Text.withComponent('h3').extend`
    font-size: 24px;
`;

const H4 = Text.withComponent('h4').extend`
    font-size: 18px;
`;

const H6 = Text.withComponent('h6').extend`
    font-size: 16px;
`;

const P = Text.withComponent('p').extend`
    font-size: 14px;
`;

const Span = styled.span`
    ${space};
`;

export { H1, H2, H3, H4, H6, P, Span }