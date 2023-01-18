import { FormikHelpers } from 'formik'

export interface Room {
  roomId?: number
  roomName: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateRoomFormInterface extends Room {
  formError?: string
}

export interface onSubmitCreateRoomHandlerInterface {
  room: Room
  actions: FormikHelpers<CreateRoomFormInterface>
}
