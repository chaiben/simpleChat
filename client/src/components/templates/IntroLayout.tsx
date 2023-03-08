import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { appName } from '../../conf'
import { Center, H1 } from '../UI/atoms'

const Container = styled.div`
  margin-top: 2rem;
`

interface IntroLayoutProps {
  auth: boolean
}
export const IntroLayout = ({ auth }: IntroLayoutProps): JSX.Element => {
  return (
    <>
      {auth && <Navigate to="main" />}
      <Container>
        <Center>
          <H1>{appName}</H1>
        </Center>
        <Outlet />
      </Container>
    </>
  )
}
