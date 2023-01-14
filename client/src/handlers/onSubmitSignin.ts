import { onSubmitUserHandlerInterface } from '../interfaces/userInterface'
import UserService from '../services/UserService'

export const onSubmitSignin = async ({
  user,
  actions,
  setLoggedUser
}: onSubmitUserHandlerInterface): Promise<void> => {
  const userService = new UserService()
  try {
    const result = await userService.login(user)
    if (!result.status) {
      // Login fail
      actions.setFieldError('formError', result.error[0])
    } else {
      // Login success
      localStorage.setItem('token', result.payload.token)
      setLoggedUser(result.payload.user)
    }
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
