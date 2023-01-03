import React, { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { IntroLayout, MainLayout } from '../components/templates'
import { SigninForm, SignupForm } from '../components/UI/organisms'
import useToken from '../hooks/useToken'
import { User } from '../interfaces/userInterface'
import ProtectedRouter from './ProtectedRouter'

export const AppRoutes = (): JSX.Element => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null)

  useToken(setLoggedUser)
  const isAutheticated = loggedUser != null

  return (
    <HashRouter>
      <Routes>
        <Route element={<IntroLayout auth={isAutheticated} />}>
          <Route index element={<SigninForm setLoggedUser={setLoggedUser} />} />
          <Route
            path="signup"
            element={<SignupForm setLoggedUser={setLoggedUser} />}
          />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            path="main"
            element={
              <ProtectedRouter auth={isAutheticated}>
                <div>hola mundo</div>
              </ProtectedRouter>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  )
}
