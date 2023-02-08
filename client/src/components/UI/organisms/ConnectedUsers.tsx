import React from 'react'
import styled from 'styled-components'
import { Room } from '../../../interfaces/roomInterface'

interface ConnectedUsersProps {
  currentRoom: string
  rooms: Room[]
}

const ConnectedUsersStyled = styled.div`
  background-color: #fff;
  padding: 1rem;
  margin: 0.5rem 0;
  .usersListHeader {
    margin-bottom: 0.5rem;
  }
  .usersList {
    display: flex;
    gap: 1rem;
    div {
      font-size: 0.8rem;
    }
  }
`

export const ConnectedUsers = ({
  currentRoom,
  rooms
}: ConnectedUsersProps): React.ReactElement => {
  const room = rooms.filter((r) => r.roomName === currentRoom)[0]
  return (
    <ConnectedUsersStyled>
      <div className="usersListHeader">Online users:</div>
      <div className="usersList">
        {room.users != null &&
          room.users.length > 0 &&
          room.users.map((user) => (
            <div key={user.displayName}>{user.displayName}</div>
          ))}
      </div>
    </ConnectedUsersStyled>
  )
}
