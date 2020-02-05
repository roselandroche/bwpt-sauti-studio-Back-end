const db = require('../dbConfig')

// dashboard, show all projects
function allProjects(userId) {
    return db('projects')
        .where({ user_id: userId })
}

// find by id
function findProjectById(userId, projectId) {
    return db('projects')
        .where({ user_id: userId, id: projectId })
}

// edit project
async function editProject(updates, id, userId) {
    await db('projects')
        .where({ id })
        .update(updates)
    return findProjectById(userId, id)
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

module.exports = {
    // find, add, update, delete
    allProjects,
    findProjectById,
    addProject,
    editProject,
    remove,
}