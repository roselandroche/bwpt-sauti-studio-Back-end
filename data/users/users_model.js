const bcrypt = require('bcrypt')
const db = require('../dbConfig')

// add
async function add(user) {
    user.password = await bcrypt.hash(user.password, 13)

    const [id] = await db('users')
        .insert(user)

    return findById(id)
}

// findById
function findById(id) {
    return db('users')
        .where({ id })
        .first('id', 'username', 'email')
}

// findBy
function findBy(filter) {
    return db('users').where(filter)
}

module.exports = {
    add,
    findById,
    findBy,
}