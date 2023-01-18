import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../../../styles'
import { Card } from '../atoms'

interface Props {
  roomName: string
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.dark};
`

export const RoomCard: React.FC<Props> = ({ roomName }) => {
  return (
    <StyledLink to={roomName} key={`room_${roomName}`}>
      <Card>{roomName}</Card>
    </StyledLink>
  )
}
