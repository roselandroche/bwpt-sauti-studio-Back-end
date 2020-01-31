const bcrypt = require('bcrypt')
const express = require('express')
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
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    const user = await usersModel.findBy({ username }).first()
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

// 

module.exports = router