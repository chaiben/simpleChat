import { FormikHelpers } from 'formik'

export interface Room {
  roomName: string
}

export interface CreateRoomFormInterface extends Room {
  formError?: string
}

export interface onSubmitCreateRoomHandlerInterface {
  room: Room
  actions: FormikHelpers<CreateRoomFormInterface>
}
