
exports.seed = async (knex) => {
  await knex('users').truncate()
  await knex('projects').truncate()
  await knex('project_steps').truncate()
};
