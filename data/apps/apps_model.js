const db = require('../dbConfig')

// dashboard, show all projects
function allProjects(userId) {
    return db('projects')
        .where({ user_id: userId })
}

// find by id
function findProjectById() {

}

// add new project
async function addProject(id) {

}

// edit project
async function editProject(changes, id) {

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