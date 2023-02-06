import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from '../UI/atoms/'
import SocketContext from '../../context/SocketContext'
import { User } from '../../interfaces/userInterface'
import { BackButton } from '../UI/atoms/BackButton'
import styled from 'styled-components'
import { SendMessageForm } from '../UI/organisms/SendMessageForm'
import { Message } from '../../interfaces/messageInterface'
import { MessageRow } from '../UI/organisms/MessageRow'

const StyledCard = styled(Card)`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const MessageBox = styled.div`
  height: 400px;
  overflow-y: scroll;
  background-color: white;
  margin-bottom: 0.5rem;
  padding: 1rem;
`

export const Room = (): React.ReactElement => {
  const { room } = useParams()

  // Messages
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<Message[]>([])

  // Socket info
  const { socket, uid } = useContext(SocketContext).SocketState
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

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (divRef.current != null) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }, [messages])

  return (
    <>
      <StyledCard>
        <Link to="/main">
          <BackButton />
        </Link>
        {room}
      </StyledCard>
      <MessageBox ref={divRef}>
        {messages.length === 0 && <div>No messages</div>}
        {messages.length > 0 &&
          messages.map((message, index) => (
            <MessageRow
              key={`message_${index}`}
              currentUser={user}
              message={message}
            />
          ))}
      </MessageBox>
      <SendMessageForm userId={user.userId} roomName={room} />
    </>
  )
}
