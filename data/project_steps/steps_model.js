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
async function editStep(updates, id) {
    await db('project_steps')
        .where({ id })
        .update(updates)
    return findStepById(id)
}

// delete one step
function removeStep(id) {
    return db('project_steps').where({ id }).del()
}

// add new step
async function addStep(newStep) {
    const [id] = await db('project_steps').insert(newStep)
    return db('project_steps').where({ id }).first()
}

module.exports = {
    allSteps,
    findStepById,
    editStep,
    removeStep,
    addStep
}