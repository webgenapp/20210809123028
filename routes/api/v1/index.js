const express = require('express')
const router = express.Router()

const toysRouter = require('./toys')
router.use('/toys', toysRouter)

const ticketsRouter = require('./tickets')
router.use('/tickets', ticketsRouter)

const usersRouter = require('./users')
router.use('/users', usersRouter)

module.exports = router
