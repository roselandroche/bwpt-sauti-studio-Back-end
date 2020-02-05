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

// add new project
async function addProject(newProject) {
    const [id] = await db('projects').insert(newProject)
    return db('projects').where({ id }).first()
}

// edit project
async function editProject(updates, id) {
    await db('projects')
        .where({ id })
        .update(updates)
    return findProjectById(id)
}

// delete project
function remove(id) {

}

module.exports = {
    // find, add, update, delete
    allProjects,
    findProjectById,
    addProject,
    editProject,
    remove,
}