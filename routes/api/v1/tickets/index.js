const express = require('express')
const router = express.Router()
const { Ticket } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const tickets = await Ticket.findAll()

  res.send(tickets)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const ticket = await Ticket.findOne({ where: { id } })

  res.send(ticket)
})

router.post('/', auth, async function (req, res, next) {
  const ticket = await Ticket.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(ticket)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Ticket.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const ticket = await Ticket.findOne({ where: { id } })

  ticket.number = req.body.number

  ticket.save()

  res.send(ticket)
})

module.exports = router
