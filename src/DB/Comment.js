var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

module.exports = mongoose.model('Comment', new mongoose.Schema({
  username: {
    type: String,
  },
  creat_time: {
    type: Date,
    default: Date.now
  },
  cotent: {
    type: String,
  },
  targett: {
    type: String,
  },

}))
