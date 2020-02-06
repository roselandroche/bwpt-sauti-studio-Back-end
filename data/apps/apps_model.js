const db = require('../dbConfig')

// dashboard, show all projects
function allProjects(userId) {
    return db('projects')
        .where({ user_id: userId })
}

// find project by id
function findProjectById(id) {
    return db('projects')
        .where({ id })
        .first()
}

// edit project
async function editProject(updates, id) {
    await db('projects')
        .where({ id })
        .update(updates)
    return findProjectById(id)
}

// add new project
async function addProject(newProject) {
    const [id] = await db('projects').insert(newProject)
    return db('projects').where({ id }).first()
}

// delete project
function remove(id) {
    return db('projects').where({ id }).del()
}

/////////////////////////////////////////////////////////////
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
function removeStep(stepId) {
    return db('project_steps').where({ stepId }).del()
}

// add new step
async function addStep(newStep) {
    const [id] = await db('project_steps').insert(newStep)
    return db('project_steps').where({ id }).first()
}

module.exports = {
    allProjects,
    findProjectById,
    addProject,
    editProject,
    remove,
    allSteps,
    findStepById,
    editStep,
    removeStep,
    addStep,
}