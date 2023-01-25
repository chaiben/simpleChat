import React, { useContext, useEffect, useState } from 'react'
import SocketContext from '../../context/SocketContext'
import { RoomService } from '../../services'
import { Room } from '../../interfaces/roomInterface'
import { colors } from '../../styles'
import { Card } from '../UI/atoms/'
import { RoomCard } from '../UI/molecules/'
import { CreateRoomForm } from '../UI/organisms/'
import sortObject from '../../helpers/sortObject'

export const Main = (): React.ReactElement => {
  // Get token
  const token = localStorage.getItem('token')

  // Socket info
  const { socket, uid, users } = useContext(SocketContext).SocketState

  // Rooms
  const [rooms, setRooms] = useState<Room[]>([])

  // Loading Rooms
  useEffect(() => {
    const roomService = new RoomService(token)
    async function fetchData(): Promise<void> {
      setRooms(await roomService.getAll())
    }
    void fetchData()
  }, [token])

  return (
    <>
      <CreateRoomForm setRooms={setRooms} />
      {rooms === null && <div>Loading...</div>}
      {rooms?.length == null && <div>Create a room to continue.</div>}
      {rooms?.length != null &&
        sortObject(rooms, 'roomName').map((room) => (
          <RoomCard key={`room_${room.roomName}`} {...room}></RoomCard>
        ))}
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
