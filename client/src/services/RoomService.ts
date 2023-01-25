import { ApiResponse } from '../interfaces/apiInterface'
import { Room } from '../interfaces/roomInterface'
import APIService from './APIService'

export default class RoomService extends APIService {
  // Method to create a new room
  async create(room: Room): Promise<ApiResponse> {
    return await this.post('rooms/create/', room)
  }

  // Method to receive all created rooms
  async getAll(): Promise<Room[]> {
    try {
      const result = await this.get('rooms/')
      return result.payload as Room[]
    } catch (err) {
      return []
    }
  }
}
