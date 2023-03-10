import { FormikHelpers } from 'formik'

export interface User {
  userId?: number
  userName?: string
  displayName?: string
  password?: string
  updatedAt?: string
  createdAt?: string
}

export interface RegisterForm extends User {
  passwordConfirmation?: string
  formError?: string
}

export interface SignFormProps {
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>
}

export interface onSubmitUserHandlerInterface {
  user: RegisterForm
  actions: FormikHelpers<RegisterForm>
  setLoggedUser: React.Dispatch<React.SetStateAction<User | null>>
}
