const mongoose = require('mongoose')
const reurlSchema = new mongoose.Schema ({
  input_url: {
    type: String,
    required: true
  },
  random_string: {
    type: String
  }
})

module.exports = mongoose.model('Reurl', reurlSchema)