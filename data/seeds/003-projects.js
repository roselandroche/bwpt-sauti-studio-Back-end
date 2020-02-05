
exports.seed = async (knex) => {
  await knex('projects').insert([
    { project_name: 'Build Wells', description: 'Locate places to build wells, fundraise', user_id: 1 },
    { project_name: 'Educate', description: 'Connect to world, educate on current African issues', user_id: 2 },
    { project_name: 'Transport', description: 'Give options for safest way to travel between locations', user_id: 3 }
  ])
};
