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
const User = require('./app/models/users')
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error: '))
app.set('secretKey', config.secret)
app.use(cors())

// Router API
// endpoint login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      res
        .status(401)
        .json({ success: false, message: 'User tidak ada didatabase' })
      return
    }
    // harusnya passwordnya hash
    if (user.password != req.body.password) {
      res.status(401).json({ success: false, message: 'password user salah!' })
      return
    }
    // membuat token
    const token = jwt.sign({ id: user._id }, app.get('secretKey'), {
      expiresIn: '24h',
    })
    // mengirim balik token
    res.json({ success: true, message: 'token berhasil di dapatkan!', token })
    // jika error
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/', (req, res) => {
  res.send('ini di route home!')
})
router.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('Internal Server Error')
    })
})

// prefix /api
app.use('/api', router)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
