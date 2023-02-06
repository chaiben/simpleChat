import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from '../UI/atoms/'
import { colors } from '../../styles'
import SocketContext from '../../context/SocketContext'
import { User } from '../../interfaces/userInterface'
import { BackButton } from '../UI/atoms/BackButton'
import styled from 'styled-components'
import { SendMessageForm } from '../UI/organisms/SendMessageForm'
import { Message } from '../../interfaces/messageInterface'

const StyledCard = styled(Card)`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const MessageBox = styled.div`
  height: 400px;
  background-color: white;
`

export const Room = (): React.ReactElement => {
  const { room } = useParams()

  // Messages
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<Message[]>([])

  // Socket info
  const { socket, uid, users } = useContext(SocketContext).SocketState
  const user = JSON.parse(uid) as User

  // Enter room
  useEffect(() => {
    socket?.emit('enter_room', user.userId, room)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Updated messages list
  useEffect(() => {
    socket?.on('update_messages', (roomName, newMessages) => {
      if (roomName === room) {
        setMessages(newMessages)
      }
    })
  }, [room, socket])

  return (
    <>
      <StyledCard>
        <Link to="/main">
          <BackButton />
        </Link>
        {room}
      </StyledCard>
      <MessageBox>
        {messages.length === 0 && <div>No messages</div>}
        {messages.length > 0 &&
          messages.map((message) => (
            <div key={message.messageId}>
              <p>{message.message}</p>
            </div>
          ))}
      </MessageBox>
      <SendMessageForm userId={user.userId} roomName={room} />
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
