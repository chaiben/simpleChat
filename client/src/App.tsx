import React from 'react'
import { GlobalStyle } from './styles'
import { H1 } from './components/UI/atoms'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <H1>Hola Mundo</H1>
    </>
  )
}

export default App
