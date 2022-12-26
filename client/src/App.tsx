import React from 'react'
import { SignupForm } from './components/UI/organisms'
import { GlobalStyle } from './styles'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <SignupForm />
    </>
  )
}

export default App
