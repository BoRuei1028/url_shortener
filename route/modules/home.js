const express = require('express')
const router = express.Router()

const Reurl = require('../../models/reurl')
const getRandomString = require('../../public/javascripts/getRandomString')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const inputUrl = req.body.url
  const randomString = getRandomString()
  Reurl.findOne({ inputUrl })
    .lean()
    .then((item) => {
      //找不到 => item === null => create => render
      if (!item) {
        item = { inputUrl, randomString }
        return Reurl.create(item)
          .then(() => res.render('result', { item }))
          .catch(err => console.log(err))
      }

      //找到 => render
      res.render('result', { item })
    })
    .catch(err => console.log(err))
})

router.get('/:randomString', (req, res) => {
  const randomString = req.params.randomString
  Reurl.findOne({ randomString })
    .then((filterData) => res.redirect(`${filterData.inputUrl}`))
    .catch(err => console.log(err))
})

module.exports = router