const mongoose = require('mongoose')
const reurlSchema = new mongoose.Schema ({
  inputUrl: {
    type: String,
  },
  randomString: {
    type: String
  }
})

module.exports = mongoose.model('Reurl', reurlSchema)