const supertest = require('supertest')
const server = require('../../index')

describe('users router', () => {
    describe('register', () => {
        it('should register a new user, return 201', async () => {
            const response = await supertest(server).post('/register').send({ 
                username: 'Don',
                password: '123',
                email: 'don@gmail.com'
             })
        })
    })
})