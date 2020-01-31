
exports.seed = async (knex) => {
  await knex('projects').insert([
    { project_name: 'Build Wells', description: 'Locate places to build wells, fundraise' },
    { project_name: 'Educate', description: 'Connect to world, educate on current African issues' },
    { project_name: 'Transport', description: 'Give options for safest way to travel between locations' }
  ])
};
