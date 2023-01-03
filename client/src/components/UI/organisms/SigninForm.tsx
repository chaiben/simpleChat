import { Form, Formik } from 'formik'
import React from 'react'
import { FlexBox } from '../../../styles'
import { Button, Center, StyledLink, Error } from '../atoms'
import { FieldWithError } from '../molecules'
import { signinSchema } from '../../../schemas'
import { User, RegisterForm } from '../../../interfaces/userInterface'
import { onSubmitSignin } from '../../../handlers'

interface Props {
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const SigninForm = ({ setLoggedUser }: Props): React.ReactElement => {
  const initialValues: RegisterForm = {
    userName: '',
    password: ''
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={signinSchema}
        onSubmit={async (user, actions) =>
          await onSubmitSignin(user, actions, setLoggedUser)
        }
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="formLayout">
            <FlexBox>
              <FieldWithError
                id="userName"
                name="userName"
                placeholder="Username"
                error={errors.userName}
                touched={touched.userName}
              />
              <FieldWithError
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                error={errors.password}
                touched={touched.password}
              />
              {errors.formError !== null ? (
                <Center>
                  <Error>{errors.formError}</Error>
                </Center>
              ) : null}
              <Center>
                <Button type="submit" disabled={isSubmitting}>
                  Sign in
                </Button>
              </Center>
              <Center>
                <StyledLink to="./signup">I do not have an account</StyledLink>
              </Center>
            </FlexBox>
          </Form>
        )}
      </Formik>
    </div>
  )
}
