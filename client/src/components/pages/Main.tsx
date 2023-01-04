import React from 'react'
import { User } from '../../interfaces/userInterface'
import { CreateRoomForm } from '../UI/organisms/CreateRoomForm'

interface MainProps {
  user: User | null
}

export const Main = ({ user }: MainProps): React.ReactElement => {
  return (
    <>
      <CreateRoomForm />
    </>
  )
}
