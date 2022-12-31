import { Form, Formik } from 'formik'
import React from 'react'
import { FlexBox } from '../../../styles'
import { Button, Center, StyledLink, Error } from '../atoms'

import { FieldWithError } from '../molecules'
import { RegisterForm } from '../../../interfaces/userInterface'
import { onSubmitSignup } from '../../../handlers'
import { signupSchema } from '../../../schemas'
import { Persist } from 'formik-persist'

export const SignupForm: React.FC = () => {
  const initialValues: RegisterForm = {
    userName: '',
    displayName: '',
    password: '',
    passwordConfirmation: ''
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={onSubmitSignup}
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
                id="displayName"
                name="displayName"
                placeholder="Display Name"
                error={errors.displayName}
                touched={touched.displayName}
              />
              <FieldWithError
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                error={errors.password}
                touched={touched.password}
              />
              <FieldWithError
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                type="password"
                error={errors.passwordConfirmation}
                touched={touched.passwordConfirmation}
              />
              {errors.formError !== null ? (
                <Center>
                  <Error>{errors.formError}</Error>
                </Center>
              ) : null}
              <Center>
                <Button type="submit" disabled={isSubmitting}>
                  Register
                </Button>
              </Center>
              <Center>
                <StyledLink to="/">I already have an account</StyledLink>
              </Center>
            </FlexBox>
            <Persist name="signup-form" />
          </Form>
        )}
      </Formik>
    </div>
  )
}
