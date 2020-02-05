
exports.seed = async (knex) => {
  await knex('users').insert([
    { username: 'Izula', password: 'abc', email: 'izula@gmail.com' },
    { username: 'Ayanda', password: '123', email: 'ayanda@gmail.com' },
    { username: 'Mhambi', password: 'abc123', email: 'mhambi@gmail.com' },
  ])
};
