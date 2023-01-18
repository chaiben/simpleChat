import {
  ApiResponse,
  GetLoginResponse,
  GetUserResponse
} from '../interfaces/apiInterface'
import { User } from '../interfaces/userInterface'
import APIService from './APIService'

export default class UserService extends APIService {
  // Method to create a new user
  async register(user: User): Promise<User> {
    return await this.post('users/register/', user)
  }

  // Method to delete an user
  async delete({ userName, password }: User): Promise<ApiResponse> {
    return await this.post('users/unsubscribe/', { userName, password })
  }

  // Method to login
  async login({ userName, password }: User): Promise<GetLoginResponse> {
    return await this.post('users/login/', { userName, password })
  }

  // Method to get user by token
  async getInfo(token: string): Promise<GetUserResponse> {
    return await this.post('users/tokeninfo/', { token })
  }
}
