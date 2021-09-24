import { createGlobalStyle } from "styled-components";
// sets a global theme style
const GlobalStyle = createGlobalStyle`
  html, body {
    min-height: 100%;
    min-width: 100%;
  }
  body {
    font-family: 'Lato', Helvetica, Arial, Roboto, sans-serif;
  }
  .App {
    min-height: 100vh;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    overflow-x:  hidden;
    transition: color 300ms linear, background-color 300ms linear;
  }
  `;

export default GlobalStyle;