import * as Yup from 'yup'

export const createRoomSchema = Yup.object().shape({
  roomName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Room name is required')
})
