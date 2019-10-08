const express = require('express')
const robotRouter = express.Router()
const RobotService = require('../../../lib/RobotService.js')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

robotRouter.post('/execute-robot-instructions', jsonParser, (req, res, next) => {
  const robotServiceInstance = new RobotService()
  if (!req.body.instructions) return next({ statusCode: 400, msg: 'Missing instructions' })
  const result = robotServiceInstance.run(req.body.instructions)
  return res.set('Content-Type', 'application/json').status(200).send(JSON.stringify({ output: result }))
})

robotRouter.use('/*', (req, res, next) => {
  return next({ statusCode: 400, msg: 'Invalid route' })
})

robotRouter.use((err, req, res, next) => {
  if (err) {
    return res.status(400).send(JSON.stringify(err))
  }
  return res.status(200).send(JSON.stringify())
})

module.exports = robotRouter
