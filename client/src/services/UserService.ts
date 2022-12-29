import axios from 'axios'
import { API_URL } from '../conf'
import { ApiResponse } from '../interfaces/apiInterface'
import { User } from '../interfaces/userInterface'

export default class UserService {
  // Método para crear un nuevo usuario
  async post(user: User): Promise<User> {
    try {
      const response = await axios.post(API_URL + 'users/register/', user)
      return response.data
    } catch (error) {
      throw error
    }
  }

  // Método para eliminar un usuario
  async delete(user: User): Promise<ApiResponse> {
    try {
      const response = await axios.post(API_URL + 'users/unsubscribe/', user)
      return response.data
    } catch (error) {
      throw error
    }
  }
}
