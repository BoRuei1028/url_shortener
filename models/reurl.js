const mongoose = require('mongoose')
const reurlSchema = new mongoose.Schema({
  inputUrl: {
    type: String,
    required: true
  },
  randomString: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Reurl', reurlSchema)