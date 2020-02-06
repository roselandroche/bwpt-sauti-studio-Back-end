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
    return db('project_steps')
        .where({ user_id: userId })
}

// get one step

// edit one step

// delete one step

// add new step

module.exports = {
    // find, add, update, delete
    allProjects,
    findProjectById,
    addProject,
    editProject,
    remove,
    allSteps,
}