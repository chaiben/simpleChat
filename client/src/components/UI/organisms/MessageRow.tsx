import React from 'react'
import styled from 'styled-components'
import { Message } from '../../../interfaces/messageInterface'
import { User } from '../../../interfaces/userInterface'

interface MessageProps {
  currentUser: User
  message: Message
}

const MessageRowStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0;
  div {
    font-size: 0.8rem;
  }
  .MessageHeader {
    color: gray;
    font-size: 0.7rem;
  }
  &.self {
    align-items: flex-end;
  }
  &.system {
    align-items: center;
    color: gray;
    div {
      font-size: 0.7rem;
    }
  }
`

export const MessageRow = ({
  currentUser,
  message
}: MessageProps): React.ReactElement => {
  const typeMessage =
    message.userId === null
      ? 'system'
      : currentUser.userId === message.user?.userId
      ? 'self'
      : ''
  const createAt =
    message.createdAt != null
      ? new Date(message.createdAt).toLocaleString('es-ES')
      : ''
  const userDisplayName =
    message.user?.displayName != null
      ? typeMessage === 'self'
        ? 'You'
        : message.user.displayName
      : ''
  const messageHeader = `${createAt} - ${userDisplayName}:`

  return (
    <MessageRowStyled className={typeMessage}>
      {message.userId != null && (
        <div className="MessageHeader">{messageHeader}</div>
      )}
      <div>{message.message}</div>
    </MessageRowStyled>
  )
}
