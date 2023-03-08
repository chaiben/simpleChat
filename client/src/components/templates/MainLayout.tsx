import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { appName } from '../../conf'
import useToken from '../../hooks/useToken'
import { User } from '../../interfaces/userInterface'
import { colors } from '../../styles'
import { H1, LogoutButton } from '../UI/atoms'

const Container = styled.div`
  margin-top: 1rem;
`

const TopHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`

const UserName = styled.div`
  font-weight: bold;
  color: ${colors.error};
`

interface MainLayoutProps {
  user: User | null
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const MainLayout = ({
  user,
  setLoggedUser
}: MainLayoutProps): JSX.Element => {
  useToken(setLoggedUser)
  return (
    <Container>
      <TopHeader>
        <H1 mb="2rem">{appName}</H1>
        <Menu>
          <UserName>{user?.displayName}</UserName>
          <LogoutButton setLoggedUser={setLoggedUser} />
        </Menu>
      </TopHeader>
      <Outlet />
    </Container>
  )
}
