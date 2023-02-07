import { onSubmitUserHandlerInterface } from '../interfaces/userInterface'
import UserService from '../services/UserService'

export const onSubmitSignup = async ({
  user,
  actions,
  setLoggedUser
}: onSubmitUserHandlerInterface): Promise<void> => {
  const userService = new UserService()
  try {
    // Register user
    await userService.register(user)

    // Login in
    const result = await userService.login(user)
    localStorage.setItem('token', result.payload.token)
    setLoggedUser(result.payload.user)
  } catch (error) {
    if (error.response.status === 404) {
      actions.setFieldError('formError', 'Server not found')
      return
    }
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
