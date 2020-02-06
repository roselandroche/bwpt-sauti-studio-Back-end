const supertest = require('supertest')
const server = require('../../index')
const db = require('../dbConfig')

beforeAll(async () => {
    console.log(`called`)
    await db.truncate('users')
    await db.seed.run()
})

describe('apps router', () => {
    describe('get dashboard', () => {
        it('should get the apps of the logged in user, return 201', async () => {
            const user = await supertest(server).post('/login').send({
                username: `Izula`,
                password: `password`,
            })
            const { token } = user.body
            const res = await supertest(server).get('/dashboard').set('authorization', token)

             expect(res.status).toBe(200)
             expect(res.type).toBe('application/json')
        })
        it('should not get apps if not logged in, return 401', async () => {
            const res = await supertest(server).get('/dashboard')
            expect(res.status).toBe(401)
            expect(res.type).toBe('application/json')
        })
    })
    describe('get one project', () => {
        it('should get one project of logged in user, return 200', async () => {
            const user = await supertest(server).post('/login').send({
                username: `Izula`,
                password: `password`,
            })
            const { token } = user.body

            const res = await supertest(server).get('/dashboard/1').set('authorization', token)
            expect(res.status).toBe(200)
            expect(res.type).toBe('application/json')
            expect(res.body.project_name).toBe('Build Wells')
        })
        it('should return 404 if requested project does not exist', async () => {
            const user = await supertest(server).post('/login').send({
                username: `Izula`,
                password: `password`,
            })
            const { token } = user.body

            const res = await supertest(server).get('/dashboard/5').set('authorization', token)
            expect(res.status).toBe(404)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe('Project does not exist')
        })
        it('should return 401 if no user logged in', async () => {
            const res = await supertest(server).get('/dashboard/1')
            expect(res.status).toBe(401)
            expect(res.type).toBe('application/json')
        })
    })
    describe('edit one project', () => {
        it('should edit one project of logged in user, return 200', async () => {
            const user = await supertest(server).post('/login').send({
                username: `Izula`,
                password: `password`,
            })
            const { token } = user.body

            const res = await supertest(server).put('/dashboard/1').set('authorization', token).send({
                project_name: `Build many wells`
            })
            expect(res.status).toBe(200)
            expect(res.type).toBe('application/json')
            expect(res.body.project_name).toBe('Build many wells')
        })
        it('should return 404 if requested project does not exist', async () => {
            const user = await supertest(server).post('/login').send({
                username: `Izula`,
                password: `password`,
            })
            const { token } = user.body

            const res = await supertest(server).put('/dashboard/5').set('authorization', token).send({
                project_name: `Build many wells`
            })
            expect(res.status).toBe(404)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe('Project does not exist')
        })
        it('should return 401 if no user logged in', async () => {
            const res = await supertest(server).get('/dashboard/1')
            expect(res.status).toBe(401)
            expect(res.type).toBe('application/json')
        })
    })
    describe('delete a project', () => {
        it('should delete one project of logged in user, return 204', async () => {
            const user = await supertest(server).post('/login').send({
                username: `Izula`,
                password: `password`,
            })
            const { token } = user.body

            const res = await supertest(server).delete('/dashboard/1').set('authorization', token)
            expect(res.status).toBe(204)
        })
        it('should return 404 if requested project does not exist', async () => {
            const user = await supertest(server).post('/login').send({
                username: `Izula`,
                password: `password`,
            })
            const { token } = user.body

            const res = await supertest(server).delete('/dashboard/5').set('authorization', token)
            expect(res.status).toBe(404)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe('Cannot delete projects that do not exist')
        })
        it('should return 401 if no user logged in', async () => {
            const res = await supertest(server).get('/dashboard/1')
            expect(res.status).toBe(401)
            expect(res.type).toBe('application/json')
        })
    })
    describe('add new project', () => {
        it('should add new project to logged in user, return 201', async () => {
            const user = await supertest(server).post('/login').send({
                username: `Izula`,
                password: `password`,
            })
            const { token } = user.body

            const res = await supertest(server).post('/dashboard/4').set('authorization', token).send({
                project_name: `Build wells`,
                description: 'Supply clean water',
                user_id: 1
            })
            // console.log(res.body)
            expect(res.status).toBe(201)
            expect(res.type).toBe('application/json')
            expect(res.body.project_name).toBe('Build wells')
        })
    })
})