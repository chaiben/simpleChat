import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
  }
  html {
    height: 100%;
  }
  body {
    display: flex;
    /* flex-direction: column; */
    /* justify-content: center; */
    height: 100%;
    background: linear-gradient(360deg, rgba(78, 205, 196, 0.136394) 0%, rgba(255, 255, 255, 0.14) 100%);
  }
  #root{
    align-self: center;
    margin: 0 auto;
    width: 80%;
    max-width: 500px;
    height: 100%;
  }
`

export { GlobalStyle }
