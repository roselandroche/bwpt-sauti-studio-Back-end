const express = require('express')
const appsModel = require('./apps_model')
const restricted = require('../middleware/restricted')

const router = express.Router()

// routes

module.exports = router