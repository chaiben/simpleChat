import { onSubmitCreateRoomHandlerInterface } from '../interfaces/roomInterface'

export const onSubmitCreateRoom = async ({
  room,
  actions,
  setRooms,
  socket
}: onSubmitCreateRoomHandlerInterface): Promise<void> => {
  actions.setSubmitting(false)
  socket?.emit('create_room', room)
}
