
exports.seed = async (knex) => {
  await knex('projects').insert([
    { project_name: 'Visage Tome', description: 'Similar to Facebook', project_steps_id: 1 },
    // { username: 'Ayanda', password: '123', email: 'ayanda@gmail.com', project_id: 1 },
    // { username: 'Mhambi', password: 'abc123', email: 'mhambi@gmail.com', project_id: 1 }
  ])
};
