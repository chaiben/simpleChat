import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
  }
  #root{
    margin: 0 auto;
  }
`

export { GlobalStyle }
