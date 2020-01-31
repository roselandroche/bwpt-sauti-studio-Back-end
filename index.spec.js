const supertest = require('supertest')
const server = require('./index')
// const db = require('./data/dbConfig')

test('welcome', async () => {
    const res = await supertest(server).get('/')
    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toBe(`Welcome to the Sauti Studio Application!`)
})