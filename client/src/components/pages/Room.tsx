import React from 'react'
import { useParams } from 'react-router-dom'

export const Room = (): React.ReactElement => {
  const { room } = useParams()
  return <div>{room}</div>
}
