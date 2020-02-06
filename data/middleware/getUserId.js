const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

function getUserId(req, res, next) {
    console.log(req)
    const token = req.headers.authorization
    if(!token) {
        res.status(401).json({ message: `Missing headers` })
    } else {
        const decoded = jwt.decode(token, secrets)
        req.userId = decoded.subject
        next()
    }
}

module.exports = getUserId