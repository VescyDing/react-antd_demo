var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

module.exports = mongoose.model('User', new mongoose.Schema({
  username: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    email: {
      type: String,
    },
    nickname: {
      type: String,
    },
    residence: {
      type: Array,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    creat_time: {
      type: Date,
      default: Date.now
    }
}))
