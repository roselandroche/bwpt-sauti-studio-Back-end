
exports.up = async function(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('username', 128).notNull().unique()
        table.string('password', 128).notNull()
        table.string('email').notNull().unique()
    })
    await knex.schema.createTable('projects', (table) => {
        table.increments('id')
        table.string('project_name', 128).notNull().unique()
        table.string('description').notNull()
        table.integer('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
    await knex.schema.createTable('project_steps', (table) => {
        table.increments('id')
        table.string('step_name', 128).notNull()
        table.string('description').notNull()
        table.integer('project_id')
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('project_steps')
    await knex.schema.dropTableIfExists('projects')
    await knex.schema.dropTableIfExists('users')
};
