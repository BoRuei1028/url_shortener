const mongoose = require('mongoose')
const reurlSchema = new mongoose.Schema ({
  url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Reurl', reurlSchema)