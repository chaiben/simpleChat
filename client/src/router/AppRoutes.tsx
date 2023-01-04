import React, { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Main } from '../components/pages/Main'
import { Signin } from '../components/pages/Signin'
import { Signup } from '../components/pages/Signup'
import { IntroLayout, MainLayout } from '../components/templates'
import useToken from '../hooks/useToken'
import { User } from '../interfaces/userInterface'
import ProtectedRouter from './ProtectedRouter'

export const AppRoutes = (): JSX.Element => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null)

  // Get all info from a valid token
  useToken(setLoggedUser)
  const isAutheticated = loggedUser != null

  return (
    <HashRouter>
      <Routes>
        <Route element={<IntroLayout auth={isAutheticated} />}>
          <Route index element={<Signin setLoggedUser={setLoggedUser} />} />
          <Route
            path="signup"
            element={<Signup setLoggedUser={setLoggedUser} />}
          />
        </Route>
        <Route
          element={
            <MainLayout user={loggedUser} setLoggedUser={setLoggedUser} />
          }
        >
          <Route
            path="main"
            element={
              <ProtectedRouter auth={isAutheticated}>
                <Main user={loggedUser} />
              </ProtectedRouter>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  )
}
