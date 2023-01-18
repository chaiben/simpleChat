import axios from 'axios'
import { API_URL } from '../conf'
import { ApiResponse } from '../interfaces/apiInterface'

export default class APIService {
  header?: Object
  constructor(token?: string | null) {
    this.header =
      token != null
        ? {
            headers: {
              'user-token': token
            }
          }
        : undefined
  }

  async post(url: string, data: Object): Promise<any> {
    try {
      const response = await axios.post(API_URL + url, data, this.header)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async get(url: string): Promise<ApiResponse> {
    try {
      const response = await axios.get(API_URL + url, this.header)
      return response.data
    } catch (error) {
      throw error
    }
  }
}
