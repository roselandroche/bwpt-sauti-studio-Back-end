const express = require('express')
const appsModel = require('./apps_model')
const restricted = require('../middleware/restricted')

const router = express.Router()

// get all projects
router.get('/dashboard', async (req, res, next) => {
    try {
        const dash = await appsModel.allProjects(req.userId)
        res.status(201).json(dash)
    }
    catch (err) {
        next(err)
    }
})

// get one project
router.get('/dashboard/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        const oneProject = await appsModel.findProjectById(id, req.userId)
        if(oneProject) {
            res.status(201).json(oneProject)
        }
        res.status(404).json({
            message: `Project does not exist`
        })
    }
    catch (err) {
        next(err)
    }
})

// edit one project
router.put('/dashboard/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const updates = req.body
        const toUpdate = await appsModel.findProjectById(id)
        if(toUpdate) {
            const updated = await appsModel.update(updates, id)
            res.json(updated)
        }
        res.status(404).json({ message: `Project does not exist` })
    }
    catch (err) {
        next(err)
    }
})

// create new project
router.post('/dashboard/new', async (req, res, next) => {
    try {
        const toAdd = req.body
        const added = await appsModel.addProject(toAdd)
        res.status(201).json(added)
    }
    catch (err) {
        next(err)
    }
})



module.exports = router