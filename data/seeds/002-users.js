const bcrypt = require('bcryptjs')

exports.seed = async (knex) => {
  await knex('users').insert([
    { username: 'Izula', password: bcrypt.hash('abc'), email: 'izula@gmail.com' },
    { username: 'Ayanda', password: bcrypt.hash('123'), email: 'ayanda@gmail.com' },
    { username: 'Mhambi', password: bcrypt.hash('abc123'), email: 'mhambi@gmail.com' },
  ])
};
