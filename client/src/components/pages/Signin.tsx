import React from 'react'
import { SignFormProps } from '../../interfaces/userInterface'
import { SigninForm } from '../UI/organisms'

export const Signin = ({
  setLoggedUser
}: SignFormProps): React.ReactElement => {
  return <SigninForm setLoggedUser={setLoggedUser} />
}
