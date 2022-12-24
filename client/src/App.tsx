import React from 'react'
import { colors, GlobalStyle } from './styles'
import { H1, Button, Input } from './components/UI/atoms'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <H1 color={colors.main}>Hola Mundo</H1>
      <Input
        id="inputId"
        name="inputName"
        placeholder="Add something"
        error="1"
      />
      <Button>Button 1!</Button>
    </>
  )
}

export default App
