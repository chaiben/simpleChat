import React, { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Main, Room, Signin, Signup } from '../components/pages'
import { IntroLayout, MainLayout } from '../components/templates'
import SocketContextComponent from '../context/SocketContextComponent'
import useToken from '../hooks/useToken'
import { User } from '../interfaces/userInterface'
import ProtectedRouter from './ProtectedRouter'

export const AppRoutes = (): JSX.Element => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null)

  // Check if user is logged
  useToken(setLoggedUser)

  // Get all info from a valid token
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
            <ProtectedRouter auth={isAutheticated}>
              <SocketContextComponent loggedUser={loggedUser}>
                <MainLayout user={loggedUser} setLoggedUser={setLoggedUser} />
              </SocketContextComponent>
            </ProtectedRouter>
          }
        >
          <Route path="main" element={<Main />} />
          <Route path="main/:room" element={<Room />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
