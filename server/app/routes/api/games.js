const router = require('express').Router()

const { Match } = require('../../db')
const MESSAGES = require('../../helpers/helper')
const Response = require('../../models/Response')

router.get('/:player_id', async (req, res) => {
  const response = new Response()
  try {
    const matches = await Match.findAll({
      where: { player_id: req.params.player_id }
    })
    if (matches.length > 0) {
      response.addMessage(MESSAGES.ALLMATCHESPLAYED)
      response.setPayload(matches)
    } else {
      response.addMessage(MESSAGES.MATCHESNOTFOUND)
    }
    res.status(200).json(response)
  } catch (err) {
    response.setStatus(false)
    res.status(400).json(err.message)
  }
})

router.post('/:player_id', async (req, res) => {
  const response = new Response()
  try {
    const match = await Match.create({ player_id: req.params.player_id })
    response.setPayload(match)
    response.addMessage(match.result === MESSAGES.WIN ? MESSAGES.WELLPLAYED : MESSAGES.SORRY)
    res.status(201).json(response)
  } catch (err) {
    response.setStatus(false)
    if (err.name === 'SequelizeForeignKeyConstraintError') { response.addError(MESSAGES.MISSINGPLAYER) } else {
      response.addError(err)
    }
    res.status(422).json(response)
  }
})

router.delete('/:player_id', async (req, res) => {
  const response = new Response()
  try {
    const result = await Match.destroy({
      where: { player_id: req.params.player_id }
    })
    if (result) {
      response.addMessage(MESSAGES.MATCHESRDELETED)
      res.status(200).json(response)
    } else {
      response.addMessage(MESSAGES.MATCHESNOTFOUND)
      res.status(200).json(response)
    }
  } catch (err) {
    response.setStatus(false)
    response.addError(err.errors[0].message)
    res.status(400).json(response)
  }
})

module.exports = router
