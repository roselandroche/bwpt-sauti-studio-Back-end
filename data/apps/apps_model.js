const db = require('../dbConfig')

// dashboard, show all projects
async function findProjects(name) {
    return db('projects')
        .where({ username: name})
}

// add new project


// edit project

// delete project

module.exports = {
    // find, add, update, delete
    findProjects,
}