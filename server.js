// ======== Set Up package

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const app = express()
const router = express.Router()
const cors = require('cors')
// ======== Set Up Local
const config = require('./app/config')
// const User = require('./app/models/user')
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
app.set('secretKey', config.secret)
app.use(cors())

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})