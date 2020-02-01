const db = require('../dbConfig')
const usersModel = require('./users_model')

beforeEach(async () => {
    await db.seed.run()
})

describe('users model', () => {
    test('find', async () => {
        const users = await usersModel.find()
        expect(users).toHaveLength(3)
    })
    test('add', async () => {
        await usersModel.add({ 
            username: 'Rose', 
            password: '123', 
            email: 'rose@gmail.com' 
        })
        const allUsers = await db('users').select('id', 'username', 'email')
        expect(allUsers).toHaveLength(4)
    })
    test('findById', async () => {
        const first = await usersModel.findById(1)
        expect(first.username).toBe('Izula')
    })
    test('findBy', async () => {
        const name = await usersModel.findBy({ username: 'Mhambi' })
        console.log(name)
        expect(name.id).toBe(3)
    })
})