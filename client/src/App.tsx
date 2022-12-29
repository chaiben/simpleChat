import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IntroLayout } from './components/templates/IntroLayout'
import { SigninForm, SignupForm } from './components/UI/organisms'
import { GlobalStyle } from './styles'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<IntroLayout />}>
            <Route index element={<SigninForm />} />
            <Route path="signup" element={<SignupForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
