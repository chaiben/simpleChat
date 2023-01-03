import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { appName } from '../../conf'
import { User } from '../../interfaces/userInterface'
import { H1, LogoutButton } from '../UI/atoms'

const Container = styled.div`
  margin-top: 1rem;
`

const TopHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const Menu = styled.div`
  display: flex;
`

interface MainLayoutProps {
  loggedUser: User | null
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const MainLayout = ({
  loggedUser,
  setLoggedUser
}: MainLayoutProps): JSX.Element => {
  return (
    <Container>
      <TopHeader>
        <H1 mb="0">{appName}</H1>
        <Menu>
          <LogoutButton setLoggedUser={setLoggedUser} />
        </Menu>
      </TopHeader>
      <Outlet />
    </Container>
  )
}
