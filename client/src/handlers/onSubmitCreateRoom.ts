import { onSubmitCreateRoomHandlerInterface } from '../interfaces/roomInterface'
import { RoomService } from '../services'

export const onSubmitCreateRoom = async ({
  room,
  actions,
  setRooms
}: onSubmitCreateRoomHandlerInterface): Promise<void> => {
  console.log('Called onSubmitCreateRoom roomForm', room)

  // Recover token
  const token = localStorage.getItem('token')
  // Create a new instance of RoomService
  const roomService = new RoomService(token)
  // Create room
  try {
    const result = await roomService.create(room)
    if (result.status) {
      // New room created

      // Add the new room to the roomArray
      setRooms((prevRooms) => [...prevRooms, room])

      // Limpia el formulario
      actions.resetForm()
    } else {
      // Fail to save the new room
      console.log('Error', result)
      actions.setFieldError('formError', result.error[0])
    }
  } catch (err) {
    actions.setFieldError('formError', err.message)
  }
  actions.setSubmitting(false)
}
