const bcrypt = require('bcryptjs')

exports.seed = async (knex) => {
  await knex('users').insert([
    { username: 'Izula', password: '$2a$10$zY9/yBf0MYWGGtiEZrFQ8ef1KYLFPAmguEk3tX2NWP1mBhdekcj8O', email: 'izula@gmail.com' },
    { username: 'Ayanda', password: '$2a$10$zY9/yBf0MYWGGtiEZrFQ8ef1KYLFPAmguEk3tX2NWP1mBhdekcj8O', email: 'ayanda@gmail.com' },
    { username: 'Mhambi', password: '$2a$10$zY9/yBf0MYWGGtiEZrFQ8ef1KYLFPAmguEk3tX2NWP1mBhdekcj8O', email: 'mhambi@gmail.com' },
  ])
};
