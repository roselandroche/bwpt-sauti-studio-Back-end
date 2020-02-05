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
            // await supertest(server).post('/register').send({
            //     username: `Don`,
            //     password: `123`,
            //     email: `don@gmail.com`
            // })
            const user = await supertest(server).post('/login').send({
                username: `Don`,
                password: `123`,
            })
            const { token } = user.body
            console.log(user.body)
            const res = await supertest(server).get('/projects').set('authorization', token)

             expect(res.status).toBe(201)
             expect(res.type).toBe('application/json')
        })
    })
})