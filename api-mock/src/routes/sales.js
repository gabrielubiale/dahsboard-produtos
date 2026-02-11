const express = require('express')
const { sales } = require('../data/sales')

const router = express.Router()

router.get('/', (req, res) => {
  res.json(sales)
})

module.exports = router
