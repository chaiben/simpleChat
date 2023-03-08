import React, { useContext } from 'react'
import { Form, Formik } from 'formik'
import { Button, Error, FlexBox } from '../atoms'
import { FieldWithError } from '../molecules'
import { createRoomSchema } from '../../../schemas'
import { onSubmitCreateRoom } from '../../../handlers'
import {
  CreateRoomFormInterface,
  CreateRoomFormProps
} from '../../../interfaces/roomInterface'
import SocketContext from '../../../context/SocketContext'

export const CreateRoomForm = ({
  setRooms
}: CreateRoomFormProps): React.ReactElement => {
  const initialValues: CreateRoomFormInterface = {
    roomName: ''
  }

  const { socket } = useContext(SocketContext).SocketState

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={createRoomSchema}
        validateOnBlur={false}
        onSubmit={async (room, actions) =>
          await onSubmitCreateRoom({ room, actions, setRooms, socket })
        }
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FlexBox>
              <FlexBox direction="row">
                <FieldWithError
                  id="roomName"
                  name="roomName"
                  placeholder="Room name"
                  error={errors.roomName}
                  touched={touched.roomName}
                />
                <Button type="submit" disabled={isSubmitting}>
                  Create
                </Button>
              </FlexBox>
              {errors.formError !== null ? (
                <Error margin="0 0 1rem 0">{errors.formError}</Error>
              ) : null}
            </FlexBox>
          </Form>
        )}
      </Formik>
    </div>
  )
}
