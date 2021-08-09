const express = require('express')
const router = express.Router()
const { Toy } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const toys = await Toy.findAll()

  res.send(toys)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const toy = await Toy.findOne({ where: { id } })

  res.send(toy)
})

router.post('/', auth, async function (req, res, next) {
  const toy = await Toy.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(toy)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Toy.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const toy = await Toy.findOne({ where: { id } })

  toy.name = req.body.name

  toy.price = req.body.price

  toy.save()

  res.send(toy)
})

module.exports = router
