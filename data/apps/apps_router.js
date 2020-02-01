const express = require('express')
const appsModel = require('./apps_model')
const restricted = require('../middleware/restricted')

const router = express.Router()

// routes
router.get('/dashboard', async (req, res, next) => {
    try {
        const dash = await appsModel.findProjects(res.body.username)
        res.status(201).json(dash)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router