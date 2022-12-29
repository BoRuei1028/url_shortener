const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const Reurl = require('./models/reurl')

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

app.post('/shortener', (req, res) => {
  const inputUrl = req.body.url
  return Reurl.create({ inputUrl })
    .then(() => res.redirect('result'))
    .catch((error) => console.log(error))
})

app.get('/result', (req, res) => {
  // 這裡我需要將5碼亂數以及正確的url準備好
  res.render('result')
})

app.listen(port, () => {
  console.log('listening')
})