const db = require('../dbConfig')

// dashboard, show all projects
async function findProjects(id) {
    return db('projects')
        .where({ id })
}

// add new project


// edit project

// delete project

module.exports = {
    // find, add, update, delete
    findProjects,
}