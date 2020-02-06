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

// get all project steps
function allSteps(userId) {
    db('project_steps as p_s')
        .join('projects as p', 'p_s.project_id', 'p.id')
        .select('p.project_name', 'p_s.id', 'p_s.step_name', 'p_s.description')
        .orderBy('p.project_name', 'p_s.id')
        .where({ user_id: userId})
}

// get one step
function findStepById(id) {
    return db('project_steps')
        .where({ id })
        .first()
}

// edit one step

// delete one step

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
    addStep,
}