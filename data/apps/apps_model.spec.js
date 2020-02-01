const db = require('../dbConfig')
const appsModel = require('./apps_model')

beforeEach(async () => {
    await db.seed.run()
})

