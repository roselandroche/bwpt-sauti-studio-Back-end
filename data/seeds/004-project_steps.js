
exports.seed = async (knex) => {
  await knex('projects').insert([
    { step_name: 'Create a team', description: 'Connect with engineers, scientists', project_id: 1 },
    { step_name: 'Create a team', description: 'Find journalists, web developer', project_id: 2 },
    { step_name: 'Create a team', description: 'Find locals who travel often, interview them', project_id: 3 },
  ])
};
