const db = require('../dbConfig')

// dashboard, show all projects
async function findProjects(name) {
    return db('projects')
        .findBy({ username: name})
}

// add new project

// edit project

// delete project

module.exports = {
    // find, add, update, delete
    findProjects,
}