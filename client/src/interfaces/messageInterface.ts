import { FormikHelpers } from 'formik'
import { Socket } from 'socket.io-client'
import { User } from './userInterface'

export interface Message {
  messageId?: number
  roomName?: string
  userId?: number
  message: string
  createdAt?: Date
  updatedAt?: Date
  user?: User
}

export interface SendMessageFormInterface extends Message {
  formError?: string
}

export interface SendMessageFormProps {
  roomName?: string
  userId?: number
}

export interface onSubmitSendMessageHandlerInterface
  extends SendMessageFormProps {
  message: Message
  actions: FormikHelpers<SendMessageFormInterface>
  socket: Socket | undefined
}
