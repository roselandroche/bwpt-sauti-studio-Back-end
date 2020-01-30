const sqlite3 = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
}

module.exports = {

  development: {
    ...sqlite3,
    connection: {
      filename: './data/users.db3'
    }
  },
  test: {
    ...sqlite3,
    connection: {
      filename: './data/usersTest.db3'
    }
  }
};
