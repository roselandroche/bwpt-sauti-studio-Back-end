
exports.seed = async (knex) => {
  await knex('users').truncate()
  await knex('project_steps').truncate()
  await knex('projects').truncate()
};
