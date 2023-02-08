import React, { useContext } from 'react'
import { Form, Formik } from 'formik'
import { Button, Error, FlexBox } from '../atoms'
import { FieldWithError } from '../molecules'
import { onSubmitSendMessage } from '../../../handlers'
import {
  SendMessageFormInterface,
  SendMessageFormProps
} from '../../../interfaces/messageInterface'
import SocketContext from '../../../context/SocketContext'
import { createMessageSchema } from '../../../schemas/createMessageSchema'

export const SendMessageForm = ({
  roomName,
  userId
}: SendMessageFormProps): React.ReactElement => {
  const initialValues: SendMessageFormInterface = {
    message: ''
  }

  const { socket } = useContext(SocketContext).SocketState

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={createMessageSchema}
        validateOnBlur={false}
        onSubmit={async (values, actions) => {
          console.log('here')
          const message = {
            message: values.message,
            userId,
            roomName
          }
          await onSubmitSendMessage({ message, actions, socket })
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FlexBox>
              <FlexBox direction="row">
                <FieldWithError
                  id="message"
                  name="message"
                  placeholder="Send a message"
                  error={errors.message}
                  touched={touched.message}
                />
                <Button type="submit" disabled={isSubmitting}>
                  Send
                </Button>
              </FlexBox>
              {errors.formError != null && (
                <Error margin="0 0 1rem 0">{errors.formError}</Error>
              )}
            </FlexBox>
          </Form>
        )}
      </Formik>
    </div>
  )
}
