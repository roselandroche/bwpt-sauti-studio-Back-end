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
})