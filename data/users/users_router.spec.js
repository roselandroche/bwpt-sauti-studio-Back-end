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
        it('should not register a duplicate user, return 400', async () => {
            const res = await supertest(server).post('/register').send({ 
                username: 'Don',
                password: '123',
                email: 'don@gmail.com'
             })
             expect(res.status).toBe(400)
             expect(res.type).toBe('application/json')
             expect(res.body.message).toBe( `User already exists` )
        })
        it('should not register a duplicate email, return 400', async () => {
            const res = await supertest(server).post('/register').send({ 
                username: 'Ray',
                password: '123',
                email: 'don@gmail.com'
             })
             expect(res.status).toBe(400)
             expect(res.type).toBe('application/json')
             expect(res.body.message).toBe( `Email already exists` )
        })
    })
    describe('log in route', () => {
        it('Should return a 200 on successful login', async () => {
            const response = await supertest(server).post('/login').send({
                username: 'Don',
                password: '123',
            });
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
          })
        it('Should return a 401 on unsuccessful login', async () => {
            const response = await supertest(server)
                .post("/login")
                .send({username: 'Brad', password: 'I am a YOUR MAMA Kind of Guy'});
            expect(response.status).toBe(401);
            expect(response.type).toBe('application/json');
            expect(response.body.message).toBe(`User does not exist`)
        })
        it('Should return a 401 on unsuccessful login', async () => {
            const response = await supertest(server)
                .post("/login")
                .send({username: 'Don', password: 'I am a YOUR MAMA Kind of Guy'});
            expect(response.status).toBe(401);
            expect(response.type).toBe('application/json');
            expect(response.body.message).toBe(`Invalid credentials`)
        })
        it('Should return a token on successful Login', async () => {
            const response = await supertest(server)
                .post("/login")
                .send({
                    username: 'Don',
                    password: '123'
                });
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.token).toBeTruthy();
        })
    })
    describe('get all users', () => {
        it('should get a list of users if logged in, return 200', async () => {
            const user = await supertest(server).post('/login').send({
                username: `Don`,
                password: '123'
            })
            const { token } = user.body
            const res = await supertest(server).get('/users').set('authorization', token)
            expect(res.status).toBe(200)
            expect(res.type).toBe('application/json')
        })
        it('should not get a list of users if not logged in, return 401', async () => {
            const res = await supertest(server).get('/users')
            expect(res.status).toBe(401)
            expect(res.type).toBe('application/json')
        })
    })
})