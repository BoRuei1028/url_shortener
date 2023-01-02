const express = require('express')
const router = express.Router()

const Reurl = require('../../models/reurl')

router.get('/:randomString', (req, res) => {
  const randomString = req.params.randomString
  Reurl.findOne({ randomString })
    .then((filterData) => res.redirect(`${filterData.inputUrl}`))
    .catch(err => console.log(err))
})

module.exports = router