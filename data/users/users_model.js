const bcrypt = require('bcryptjs')
const db = require('../dbConfig')

// find 
function find() {
    return db('users')
        .select('username', 'email')
}
// add
async function add(user) {
    user.password = await bcrypt.hash(user.password, 10)

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
    return db('users').where(filter).first()
}

module.exports = {
    find,
    add,
    findById,
    findBy,
}