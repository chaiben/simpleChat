import { onSubmitCreateRoomHandlerInterface } from '../interfaces/roomInterface'

export const onSubmitCreateRoom = ({
  room,
  actions
}: onSubmitCreateRoomHandlerInterface): void => {
  console.log('Called onSubmitCreateRoom roomForm', room)
  console.log('Called onSubmitCreateRoom actions', actions)
}
