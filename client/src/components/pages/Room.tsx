import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from '../UI/atoms/'
import { colors } from '../../styles'
import SocketContext from '../../context/SocketContext'
import { User } from '../../interfaces/userInterface'
import { BackButton } from '../UI/atoms/BackButton'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  display: flex;
  gap: 1rem;
  align-items: center;
`

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
      <StyledCard>
        <Link to="/main">
          <BackButton />
        </Link>
        {room}
      </StyledCard>
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
