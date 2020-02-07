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
function editProject(updates, id) {
    return db('projects')
        .where({ id })
        .update(updates)
        .returning('*')
}

// add new project
function addProject(newProject) {
    return db('projects').insert(newProject).returning('*')
}

// delete project
function remove(id) {
    return db('projects').where({ id }).del()
}

module.exports = {
    allProjects,
    findProjectById,
    addProject,
    editProject,
    remove
}