import { Form, Formik } from 'formik'
import React from 'react'
import { FlexBox } from '../../../styles'
import { Button, Center, StyledLink } from '../atoms'
import * as Yup from 'yup'
import { FieldWithError } from '../molecules'
import { RegisterForm } from '../../../interfaces/userInterface'
import UserService from '../../../services/UserService'

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  displayName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      'Password must have minimum six characters, at least one letter and one number'
    ),
  passwordConfirmation: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

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
        validationSchema={SignupSchema}
        onSubmit={(user, actions) => {
          const userService = new UserService()
          const result = userService.post(user)
          console.log(result)
          actions.setSubmitting(false)
        }}
      >
        {({ errors, touched }) => (
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
              <Center>
                <Button type="submit">Register</Button>
              </Center>
              <Center>
                <StyledLink to="/">I already have an account</StyledLink>
              </Center>
            </FlexBox>
          </Form>
        )}
      </Formik>
    </div>
  )
}
