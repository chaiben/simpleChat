import { Form, Formik } from 'formik'
import React from 'react'
import { FlexBox } from '../../../styles'
import { Button, Center, Link } from '../atoms'
import * as Yup from 'yup'
import { FieldWithError } from '../molecules'

interface MyFormValues {
  username: string
  displayname: string
  password: string
  passwordConfirmation: string
}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  displayname: Yup.string()
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
  const initialValues: MyFormValues = {
    username: '',
    displayname: '',
    password: '',
    passwordConfirmation: ''
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions })
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }}
      >
        {({ errors, touched }) => (
          <Form className="formLayout">
            <FlexBox>
              <FieldWithError
                id="username"
                name="username"
                placeholder="Username"
                error={errors.username}
                touched={touched.username}
              />
              <FieldWithError
                id="displayname"
                name="displayname"
                placeholder="Display Name"
                error={errors.displayname}
                touched={touched.displayname}
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
                <Link href="www.google.es">I already have an account</Link>
              </Center>
            </FlexBox>
          </Form>
        )}
      </Formik>
    </div>
  )
}
