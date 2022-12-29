import React from 'react'
import { Outlet } from 'react-router-dom'
import { appName } from '../../conf'
import { Center, H1 } from '../UI/atoms'

export const IntroLayout: React.FC = () => {
  return (
    <>
      <Center>
        <H1>{appName}</H1>
      </Center>
      <Outlet />
    </>
  )
}
