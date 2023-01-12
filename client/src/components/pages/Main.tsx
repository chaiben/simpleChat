import React, { useContext } from 'react'
import { User } from '../../interfaces/userInterface'
import { CreateRoomForm } from '../UI/organisms/CreateRoomForm'
import SocketContext from '../../context/SocketContext'

interface MainProps {
  user: User | null
}

export const Main = ({ user }: MainProps): React.ReactElement => {
  const { socket, uid, users } = useContext(SocketContext).SocketState
  return (
    <>
      <CreateRoomForm />
      <div>
        <h2>Socket io information</h2>
        <p>
          Your user ID: <strong>{uid}</strong>
          <br />
          Users online: <strong>{users.length}</strong>
          <br />
          Socket ID: <strong>{socket?.id}</strong>
        </p>
      </div>
    </>
  )
}
