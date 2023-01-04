import React from 'react'
import { SignFormProps } from '../../interfaces/userInterface'
import { SignupForm } from '../UI/organisms'

export const Signup = ({
  setLoggedUser
}: SignFormProps): React.ReactElement => {
  return <SignupForm setLoggedUser={setLoggedUser} />
}
