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
        })
        it('Should return a token on successful Login', async () => {
            const response = await supertest(server)
                .post("/api/auth/login")
                .send({
                    username: 'Don',
                    password: '123'
                });
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.token).toBeTruthy();
        })
    })
})