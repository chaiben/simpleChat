const { Room } = require('../../db')
const Response = require('../../models/Response')

const getRoomsController = async (req, res) => {
  const response = new Response()
  try {
    const rooms = await Room.findAll()

    response.setPayload(rooms)
    res.status(200).json(response)
  } catch (err) {
    response.setStatus(false)
    response.addError(err.message)
    res.status(400).json(response)
  }
}

module.exports = getRoomsController
