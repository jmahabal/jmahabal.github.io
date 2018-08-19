import styled from 'styled-components';

const sansserif = `"Asap", sans-serif`;
const serif = `"Tangerine", serif`;
const monospace = `"Inconsalata", monospace`;

const typography = ``;

const H1 = styled.h1`
    font-size: 36px;
    font-family: ${sansserif};
    font-weight: normal;
    margin: 0;
`;

const H2 = styled.h2`
    font-size: 30px;
    font-family: ${sansserif};
    font-weight: normal;
    margin: 0;
`;

const H3 = styled.h3`
    font-size: 24px;
    font-family: ${sansserif};
    font-weight: normal;
    margin: 0;
`;

const H4 = styled.h4`
    font-size: 18px;
    font-family: ${sansserif};
    font-weight: normal;
    margin: 0;
`;

const H6 = styled.h6`
    font-size: 16px;
    font-family: ${sansserif};
    font-weight: normal;
    margin: 0;
`;

const P = styled.p`
    font-size: 14px;
    font-family: ${sansserif};
    font-weight: normal;
    margin: 0;
    line-height: 1.2;
`;

export { H1, H2, H3, H4, H6, P }