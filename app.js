const express = require('express')
const exphbs = require('express-handlebars')

const Reurl = require('./models/reurl')
const getRandomString = require('./public/javascripts/getRandomString')
require('./config/mongoose')

const router = require('./route')

const app = express()

const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(port, () => {
  console.log('listening')
})

