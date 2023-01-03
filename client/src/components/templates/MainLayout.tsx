import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { appName } from '../../conf'
import { Center, H1 } from '../UI/atoms'

const Container = styled.div`
  margin-top: 2rem;
`
export const MainLayout: React.FC = () => {
  return (
    <Container>
      <Center>
        <H1>{appName}</H1>
      </Center>
      <Outlet />
    </Container>
  )
}
