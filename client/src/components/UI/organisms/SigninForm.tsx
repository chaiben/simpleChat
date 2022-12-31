import { Form, Formik } from 'formik'
import React from 'react'
import { FlexBox } from '../../../styles'
import { Button, Center, StyledLink } from '../atoms'
import { FieldWithError } from '../molecules'
import { signinSchema } from '../../../schemas'
import { Persist } from 'formik-persist'

interface MyFormValues {
  username: string
  password: string
}

export const SigninForm: React.FC = () => {
  const initialValues: MyFormValues = {
    username: '',
    password: ''
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={signinSchema}
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
            <Persist name="signin-form" />
          </Form>
        )}
      </Formik>
    </div>
  )
}
