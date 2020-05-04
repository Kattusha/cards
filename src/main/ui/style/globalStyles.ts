import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: DINNextLTPro-Regular, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #5c5c5c;
    background-color: #f7f7f7;
  }
  @font-face {
    font-family: 'DINNextLTPro-Regular';
    src: url('../fonts/DINNextLTPro-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'DINNextLTPro-Medium';
    src: url('../fonts/DINNextLTPro-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'DINNextLTPro-Bold';
    src: url('../fonts/DINNextLTPro-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'DINNextLTPro-Light';
    src: url('../fonts/DINNextLTPro-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
}
`;

export default GlobalStyles