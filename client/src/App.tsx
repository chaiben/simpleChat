import React from 'react'
import { AppRoutes } from './router/AppRoutes'
import { GlobalStyle } from './styles'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
    </>
  )
}

export default App
