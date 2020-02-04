const supertest = require('supertest')
const server = require('../../index')
const db = require('../dbConfig')

beforeAll(async () => {
    console.log(`called`)
    await db.truncate('users')
})

describe('users router', () => {
    describe('register', () => {
        it('should register a new user, return 201', async () => {
            const res = await supertest(server).post('/register').send({ 
                username: 'Don',
                password: '123',
                email: 'don@gmail.com'
             })
             expect(res.status).toBe(201)
             expect(res.type).toBe('application/json')
             expect(res.body.username).toBe('Don')
        })
    })
    
})