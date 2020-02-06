const express = require('express')
const stepsModel = require('./steps_model')
const restricted = require('../middleware/restricted')

const router = express.Router()

// get all projects
router.get('/', restricted(), async (req, res, next) => {
    try {
        const steps = await stepsModel.allSteps(req.userId)
        res.status(200).json(steps)
    }
    catch (err) {
        next(err)
    }
})