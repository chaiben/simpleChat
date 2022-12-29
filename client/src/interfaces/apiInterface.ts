import { User } from './userInterface'

export interface ApiResponse {
  status: boolean
  error: string[] | string
  message: string[] | string
  payload: object | null
}

export interface GetUserResponse extends ApiResponse {
  payload: User
}
