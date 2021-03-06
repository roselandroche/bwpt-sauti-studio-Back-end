const express = require('express')

const getUserId = require('./data/middleware/getUserId')
const usersRouter = require('./data/users/users_router')
const appsRouter = require('./data/apps/apps_router')
// const stepsRouter = require('./data/project_steps/steps_model')

const server = express()
const port = process.env.PORT || 4000

server.use(express.json())
server.use(cors())

// welcome route
server.get('/', (req, res) => {
    res.status(200).json({
        message: `Welcome to the Sauti Studio Application!`
    })
})

server.use('/', usersRouter)
server.use(`/dashboard`, getUserId, appsRouter)

server.use((err, req, res, next) => {
    console.log('Err:', err)
    res.status(500).json({
        message: `Something went wrong!`
    })
})

if(!module.parent) {
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}

module.exports = server