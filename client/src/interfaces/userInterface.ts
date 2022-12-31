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
