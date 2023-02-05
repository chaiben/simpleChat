import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../UI/atoms/'
import { colors } from '../../styles'
import SocketContext from '../../context/SocketContext'
import { User } from '../../interfaces/userInterface'

export const Room = (): React.ReactElement => {
  const { room } = useParams()

  // Socket info
  const { socket, uid, users } = useContext(SocketContext).SocketState
  const user = JSON.parse(uid) as User

  // Enter room
  useEffect(() => {
    socket?.emit('enter_room', user.userId, room)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>{room}</div>
      <Card color={colors.error}>
        <h2>Socket io information</h2>
        <p>
          Your user ID: <strong>{uid}</strong>
          <br />
          Users online: <strong>{users.length}</strong>
          <br />
          Socket ID: <strong>{socket?.id}</strong>
        </p>
      </Card>
    </>
  )
}
