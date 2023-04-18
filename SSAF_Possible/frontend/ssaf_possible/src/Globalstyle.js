import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  body{
    padding: 0;
    margin: 0;
    font-family: 'Apple SD Gothic Neo M', sans-serif;
    display: block;
  }
`;

export default GlobalStyle