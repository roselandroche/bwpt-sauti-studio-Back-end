const db = require('../dbConfig')

// get all project steps
function allSteps(project_id) {
    return db('project_steps')
        .where({ project_id })
}

// get one step
function findStepById(id) {
    return db('project_steps')
        .where({ id })
        .first()
}

// edit one step
function editStep(updates, id) {
    return db('project_steps')
        .where({ id })
        .update(updates)
        .returning('*')
}

// delete one step
function removeStep(id) {
    return db('project_steps').where({ id }).del()
}

// add new step
function addStep(newStep) {
    return db('project_steps').insert(newStep).returning('*')
}

module.exports = {
    allSteps,
    findStepById,
    editStep,
    removeStep,
    addStep
}