import { Form, Formik } from 'formik'
import React from 'react'
import { FlexBox } from '../../../styles'
import { Button, Center, StyledLink } from '../atoms'
import * as Yup from 'yup'
import { FieldWithError } from '../molecules'

interface MyFormValues {
  username: string
  password: string
}

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      'Password must have minimum six characters, at least one letter and one number'
    )
})

export const SigninForm: React.FC = () => {
  const initialValues: MyFormValues = {
    username: '',
    password: ''
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={SigninSchema}
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
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                error={errors.password}
                touched={touched.password}
              />
              <Center>
                <Button type="submit">Sign in</Button>
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
