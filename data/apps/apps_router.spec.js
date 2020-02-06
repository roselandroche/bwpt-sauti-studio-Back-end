const supertest = require('supertest')
const server = require('../../index')
const db = require('../dbConfig')

beforeAll(async () => {
    console.log(`called`)
    await db.truncate('users')
    await db.seed.run()
})

describe('projects router', () => {
    describe('get dashboard', () => {
        it('should get the projects of the logged in user, return 201', async () => {
            const user = await supertest(server).post('/login').send({
                username: `Izula`,
                password: `password`,
            })
            const { token } = user.body
            console.log(user.body)
            const res = await supertest(server).get('/dashboard').set('authorization', token)

             expect(res.status).toBe(200)
             expect(res.type).toBe('application/json')
        })
    })
})