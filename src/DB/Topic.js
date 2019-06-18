var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

module.exports = mongoose.model('Topic', new mongoose.Schema({
  username: {
    type: String,
  },
  nickname: {
    type: String,
  },
  creat_time: {
    type: Date,
    default: Date.now
  },
  last_reply_time: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  star: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
  },
  cotent: {
    type: String,
  }

}))
