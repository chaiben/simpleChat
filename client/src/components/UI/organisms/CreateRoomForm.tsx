import { Form, Formik } from 'formik'
import React from 'react'
import { Button, Center, Error, FlexBox } from '../atoms'
import { FieldWithError } from '../molecules'
import { signinSchema } from '../../../schemas'
import { onSubmitCreateRoom } from '../../../handlers'
import { CreateRoomFormInterface } from '../../../interfaces/roomInterface'

export const CreateRoomForm = (): React.ReactElement => {
  const initialValues: CreateRoomFormInterface = {
    roomName: ''
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={signinSchema}
        onSubmit={(room, actions) => onSubmitCreateRoom({ room, actions })}
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
                <Center>
                  <Error>{errors.formError}</Error>
                </Center>
              ) : null}
            </FlexBox>
          </Form>
        )}
      </Formik>
    </div>
  )
}
