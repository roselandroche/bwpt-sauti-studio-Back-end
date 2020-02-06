const express = require('express')
const appsModel = require('./apps_model')
// const stepsModel = require('../project_steps/steps_model');
const restricted = require('../middleware/restricted')

const router = express.Router()

// get all projects
router.get('/', restricted(), async (req, res, next) => {
    try {
        const dash = await appsModel.allProjects(req.userId)
        res.status(200).json(dash)
    }
    catch (err) {
        next(err)
    }
})

// get one project
router.get('/:id', restricted(), async (req, res, next) => {
    try{
        const { id } = req.params
        const oneProject = await appsModel.findProjectById(id)
        if(oneProject) {
            return res.status(200).json(oneProject)
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
router.put('/:id', restricted(), async (req, res, next) => {
    try {
        const { id } = req.params
        const updates = req.body
        const toUpdate = await appsModel.findProjectById(id)
        if(toUpdate) {
            const updated = await appsModel.editProject(updates, id)
            return res.json(updated)
        }
        res.status(404).json({ message: `Project does not exist` })
    }
    catch (err) {
        next(err)
    }
})

// delete project
router.delete('/:id', restricted(), async (req, res, next) => {
    try {
        const { id } = req.params
        const deleted = await appsModel.remove(id)
        if(deleted) {
            res.status(204).json({
                message: `Successfully deleted.`
            })
        }
        res.status(404).json({
            message: `Cannot delete projects that do not exist`
        })
    }
    catch (err) {
        next(err)
    }
})

// create new project
router.post('/new', restricted(), async (req, res, next) => {
    try {
        const toAdd = req.body
        const added = await appsModel.addProject(toAdd)
        res.status(201).json(added)
    }
    catch (err) {
        next(err)
    }
})

// get all steps
router.get('/:id/steps', restricted(), async (req, res, next) => {
    try {
        const steps = await appsModel.allSteps(req.userId)
        if(!steps) {
            return res.status(404).json({ 
                message: `There are no steps for this project`
            })
        }
        res.status(200).json(steps)
    }
    catch (err) {
        next(err)
    }
})

// find step by id
router.get('/:id/steps/:id', restricted(), async (req, res, next) => {
    try {
        
    }
    catch (err) {
        next(err)
    }
})

// add a step
router.post('/:id/steps', restricted(), async (req, res, next) => {
    try {
        const stepToAdd = req.body
        const addedStep = await appsModel.addStep(stepToAdd)
        res.status(201).json(addedStep)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router