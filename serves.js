const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
require('dotenv').config()
const app = express();
const diaryO = require('./routes/diary')
const userr = require('./routes/user')
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use('/api/diary', diaryO)
app.use('/api/user', userr)
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://reemsalah23456:la$442265@cluster0.nmy4lxz.mongodb.net/")
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 5000, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })