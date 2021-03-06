const bcrypt = require('bcryptjs')
const express = require('express')
const usersModel = require('./users_model')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const restricted = require('../middleware/restricted')
const db = require('../dbConfig')

const router = express.Router()

// routes

// register
router.post('/register', async (req, res, next) => {
    try {
        const userExists = await usersModel.findBy({ username: req.body.username })
        const emailExists = await usersModel.findBy({ email: req.body.email })
        if(userExists) {
            return res.status(400).json({ message: `User already exists` })
        }
        if(emailExists) {
            return res.status(400).json({ message: `Email already exists` })
        }
        console.log(req.body)
        const newUser = await usersModel.add(req.body)
        res.status(201).json(newUser)
    }
    catch (err) {
        next(err)
    }
})

// login
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    
    const user = await usersModel.findBy({ username })
    
    if(!user) {
        return res.status(401).json({ message: `User does not exist` })
    }
    const passwordValid = await bcrypt.compare(password, user.password)

    if(user && passwordValid) {
        const token = jwt.sign({
            subject: user.id,
            user: user.username,
        }, secrets.jwt, {
            expiresIn: '7d'
        })

        res.status(200).json({
            message: `Welcome ${user.username}!`,
            token: token,
        })
    } else {
        res.status(401).json({
            message: `Invalid credentials`
        })
    }
})

// see all users
router.get('/users', restricted(), async (req, res, next) => {
    try {
        const users = await usersModel.find()
        res.json(users)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router