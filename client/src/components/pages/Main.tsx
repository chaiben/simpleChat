import React, { useContext, useEffect, useState } from 'react'
import SocketContext from '../../context/SocketContext'
import { RoomService } from '../../services'
import { Room } from '../../interfaces/roomInterface'
import { colors } from '../../styles'
import { Card } from '../UI/atoms/'
import { RoomCard } from '../UI/molecules/'
import { CreateRoomForm } from '../UI/organisms/'
import sortObject from '../../helpers/sortObject'
import { User } from '../../interfaces/userInterface'

export const Main = (): React.ReactElement => {
  // Get token
  const token = localStorage.getItem('token')

  // Socket and user info
  const { socket, uid, users } = useContext(SocketContext).SocketState
  const user = JSON.parse(uid) as User
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

  // Updated rooms list
  useEffect(() => {
    socket?.on('update_rooms', (updatedRooms) => {
      setRooms(updatedRooms)
    })
  }, [socket])

  // Enter room
  useEffect(() => {
    socket?.emit('enter_room', user.userId, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
