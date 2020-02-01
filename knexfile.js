const localPg = {
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS
};
const pg = require('pg');
pg.defaults.ssl = true;
const dbConnection = process.env.DATABASE_URL || localPg;

const sqlite3 = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    }
  }
}

module.exports = {

  dev: {
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
  },
  production: {
    client: 'pg',
		connection: dbConnection,
		migrations: {
			directory: __dirname + '/data/migrations'
		},
		seeds: {
			directory: __dirname + '/data/seeds'
		}
  }
};
