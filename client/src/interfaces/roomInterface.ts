import { FormikHelpers } from 'formik'
import React from 'react'
import { Socket } from 'socket.io-client'
import { User } from './userInterface'

export interface Room {
  roomId?: number
  roomName: string
  createdAt?: string
  updatedAt?: string
  users?: User[]
}

export interface CreateRoomFormInterface extends Room {
  formError?: string
}

export interface CreateRoomFormProps {
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
}

export interface onSubmitCreateRoomHandlerInterface
  extends CreateRoomFormProps {
  room: Room
  actions: FormikHelpers<CreateRoomFormInterface>
  socket: Socket | undefined
}
