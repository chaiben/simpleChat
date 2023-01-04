import React from 'react'
import { User } from '../../interfaces/userInterface'

interface MainProps {
  user: User | null
}

export const Main = ({ user }: MainProps): React.ReactElement => {
  return <div>This is the main page. You are {user?.displayName}</div>
}
