const mongoose = require('mongoose')
const Diary = require('../Models/diaryModels.js')
const getdiary = async (req, res) => {
  const { user_id } = req.body
  const diary = await Diary.find({ user_id }).sort({ createdAt: -1 })

  res.json(diary)
}
const getdiarys = async (req, res) => {
  const { user_id } = req.params
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.json({ error: 'No such diary' })
  }

  const diary = await Diary.find({ user_id })
  if (!diary) {

    return res.json({ error: 'No such diary' })
  }

  res.json(diary)
  
}

const createDiary = async (req, res) => {
  const { title, content, user_id } = req.body
  try {
    const diary = await Diary.create({ title, content, user_id })
    res.json(diary)
  } catch (error) {
    res.json({ error: error.message })
  }
}
const deletediary = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: 'No such diary' })
  }

  const diary = await Diary.findById({ _id: id }).deleteOne()

  if (!diary) {
    return res.json({ error: 'No such diary' })
  }

  res.json(diary)
}
const updatediary = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: 'No such diary' })
  }

  const diary = await Diary.findById({ _id: id }).updateOne({ ...req.body })

  if (!diary) {
    return res.json({ error: 'No such diary' })
  }

  res.json(diary)
}

module.exports = {
  getdiary,
  getdiarys,
  createDiary,
  deletediary,
  updatediary
}


















