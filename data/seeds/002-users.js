
exports.seed = async (knex) => {
  await knex('users').insert([
    { username: 'Izula', password: 'abc', email: 'izula@gmail.com', project_id: 1 },
    { username: 'Ayanda', password: '123', email: 'ayanda@gmail.com', project_id: 1 },
    { username: 'Mhambi', password: 'abc123', email: 'mhambi@gmail.com', project_id: 1 }
  ])
};
