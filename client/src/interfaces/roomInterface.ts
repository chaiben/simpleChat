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

export interface CreateRoomFormProps {
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
}

export interface onSubmitCreateRoomHandlerInterface
  extends CreateRoomFormProps {
  room: Room
  actions: FormikHelpers<CreateRoomFormInterface>
}
