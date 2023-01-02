const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const Reurl = require('./models/reurl')
const getRandomString = require('./getRandomString')

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const app = express()

const port = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connect')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //body-parser => post


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
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

app.get('/shortener/:randomString', (req, res) => {
  const randomString = req.params.randomString
  Reurl.findOne({ randomString })
    .then((filterData) => res.redirect(`${filterData.inputUrl}`))
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log('listening')
})

