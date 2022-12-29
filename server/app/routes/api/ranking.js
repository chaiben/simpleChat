const router = require('express').Router()

const { sequelize, Player } = require('../../db')
const { QueryTypes } = require('sequelize')
const MESSAGES = require('../../helpers/helper')
const Response = require('../../models/Response')

router.get('/', async (req, res) => {
  const response = new Response()
  try {
    const ranking = await sequelize.query('SELECT p.player_id, username, p.createdAt, p.updatedAt, AVG(result)*100 "average" FROM players p RIGHT JOIN matches m USING (player_id) GROUP BY p.player_id ORDER BY average DESC', { type: QueryTypes.SELECT })
    if (ranking.length > 0) {
      response.addMessage(MESSAGES.RANKING)
      const rankingArray = await ranking.map(player => new Player(player))
      const averageArray = await sequelize.query('SELECT AVG(result)*100 "average" FROM matches', { type: QueryTypes.SELECT })
      const payload = {
        average: averageArray[0].average,
        ranking: rankingArray
      }
      response.setPayload(payload)
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

router.get('/winner', async (req, res) => {
  const response = new Response()
  try {
    const ranking = await sequelize.query('SELECT p.player_id, username, p.createdAt, p.updatedAt, AVG(result)*100 "average" FROM players p RIGHT JOIN matches m USING (player_id) GROUP BY p.player_id ORDER BY average DESC LIMIT 1', { type: QueryTypes.SELECT })
    if (ranking.length > 0) {
      response.addMessage(MESSAGES.WINNER)
      const rankingArray = await ranking.map(player => new Player(player))
      response.setPayload(rankingArray[0])
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

router.get('/loser', async (req, res) => {
  const response = new Response()
  try {
    const ranking = await sequelize.query('SELECT p.player_id, username, p.createdAt, p.updatedAt, AVG(result)*100 "average" FROM players p RIGHT JOIN matches m USING (player_id) GROUP BY p.player_id ORDER BY average ASC LIMIT 1', { type: QueryTypes.SELECT })
    if (ranking.length > 0) {
      response.addMessage(MESSAGES.LOSER)
      const rankingArray = await ranking.map(player => new Player(player))
      response.setPayload(rankingArray[0])
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

module.exports = router
