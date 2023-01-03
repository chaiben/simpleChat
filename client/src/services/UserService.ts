import axios from 'axios'
import { API_URL } from '../conf'
import {
  ApiResponse,
  GetLoginResponse,
  GetUserResponse
} from '../interfaces/apiInterface'
import { User } from '../interfaces/userInterface'

export default class UserService {
  // Method to create a new user
  async register(user: User): Promise<User> {
    try {
      const response = await axios.post(API_URL + 'users/register/', user)
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Method to delete an user
  async delete({ userName, password }: User): Promise<ApiResponse> {
    try {
      const response = await axios.post(API_URL + 'users/unsubscribe/', {
        userName,
        password
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Method to login
  async login({ userName, password }: User): Promise<GetLoginResponse> {
    try {
      const response = await axios.post(API_URL + 'users/login/', {
        userName,
        password
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Method to get user by token
  async getInfo(token: string): Promise<GetUserResponse> {
    try {
      const response = await axios.post(API_URL + 'users/tokeninfo/', {
        token
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}
