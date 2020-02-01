const express = require('express')

const usersRouter = require('./data/users/users_router')

const server = express()
const port = process.env.PORT || 4000

server.use(express.json())

// welcome route
server.get('/', (req, res) => {
    res.status(200).json({
        message: `Welcome to the Sauti Studio Application!`
    })
})

// server.use('/', usersRouter)

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