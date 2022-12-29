const router = require('express').Router()

const { sequelize, Player } = require('../../db')
const { QueryTypes } = require('sequelize')
const MESSAGES = require('../../helpers/helper')
const Response = require('../../models/Response')

router.get('/', async (req, res) => {
  const response = new Response()
  try {
    const results = await sequelize.query('SELECT p.player_id, username, p.createdAt, p.updatedAt, AVG(result)*100 "average" FROM players p LEFT JOIN matches m USING (player_id) GROUP BY p.player_id', { type: QueryTypes.SELECT })
    if (results.length > 0) {
      response.addMessage(MESSAGES.ALLPLAYERSAVG)
      response.setPayload(await results.map(result => new Player(result)))
      res.json(response)
    } else {
      response.addMessage(MESSAGES.PLAYERSNOTFOUND)
      res.json(response)
    }
  } catch (err) {
    response.setStatus(false)
    response.addError(err.message)
    res.status(400).json(response)
  }
})

router.post('/', async (req, res) => {
  const response = new Response()
  try {
    const player = await Player.create(req.body)
    response.setPayload(player)
    response.addMessage(MESSAGES.PLAYERCREATED)
    res.status(201).json(response)
  } catch (err) {
    response.setStatus(false)
    response.addError(err.errors[0].message)
    res.status(400).json(response)
  }
})

router.put('/:player_id', async (req, res) => {
  const response = new Response()
  try {
    const result = await Player.update(req.body, {
      where: { player_id: req.params.player_id }
    })
    if (result[0]) {
      response.addMessage(MESSAGES.PLAYERUPDATED)
      res.status(200).json(response)
    } else {
      response.addMessage(MESSAGES.PLAYERNOTFOUND)
      res.status(200).json(response)
    }
  } catch (err) {
    response.setStatus(false)
    response.addError(err.errors[0].message)
    res.status(400).json(response)
  }
})

router.delete('/:player_id', async (req, res) => {
  const response = new Response()
  try {
    const result = await Player.destroy({
      where: { player_id: req.params.player_id }
    })
    if (result) {
      response.addMessage(MESSAGES.PLAYERDELETED)
      res.status(200).json(response)
    } else {
      response.addMessage(MESSAGES.PLAYERNOTFOUND)
      res.status(200).json(response)
    }
  } catch (err) {
    response.setStatus(false)
    response.addError(err.errors[0].message)
    res.status(400).json(response)
  }
})

module.exports = router
