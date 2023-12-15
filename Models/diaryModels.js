const mongoose = require ('mongoose')

const diarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Diary', diarySchema)