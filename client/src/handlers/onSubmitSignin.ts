import { FormikHelpers } from 'formik'
import { RegisterForm } from '../interfaces/userInterface'
import UserService from '../services/UserService'

export const onSubmitSignin = async (
  user: RegisterForm,
  actions: FormikHelpers<RegisterForm>
): Promise<any> => {
  const userService = new UserService()
  try {
    const result = await userService.login(user)
    console.log('result', result)
  } catch (error) {
    if (error.response !== undefined) {
      // handle error response from the API
      const apiError = error.response.data
      actions.setFieldError('userName', apiError.error[0])
    } else {
      console.log(error)
    }
  }
  actions.setSubmitting(false)
}