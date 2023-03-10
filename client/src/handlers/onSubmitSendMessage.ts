import { onSubmitSendMessageHandlerInterface } from '../interfaces/messageInterface'

export const onSubmitSendMessage = async ({
  message,
  actions,
  socket
}: onSubmitSendMessageHandlerInterface): Promise<void> => {
  actions.setSubmitting(false)
  socket?.emit('new_message', message)
  actions.resetForm()
}
