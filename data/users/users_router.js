const bcrypt = require('bcrypt')
const usersModel = require('./users_model')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

const router = express.Router()

// routes

// register
router.post('/register', async (req, res, next) => {
    try {
        const newUser = await usersModel.add(req.body)
        res.status(201).json(newUser)
    }
    catch (err) {
        next(err)
    }
})

// login


// 

module.exports = router