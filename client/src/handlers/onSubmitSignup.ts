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
    setLoggedUser({
      userName: user.userName,
      displayName: user.displayName
    })
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
