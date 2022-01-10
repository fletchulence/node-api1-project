// BUILD YOUR SERVER HERE
const express = require('express');
// const Users =require('./users/model')
// const usersRouter = require('./users/usersRouter')

const server = express();

server.use(express.json())

// server.use('/api/users', usersRouter)

server.get('/hello', (req, res)=>{
   res.json({ message: 'hi im here'})
})

server.get('/api/users', (req, res)=>{

})

module.exports = server; // EXPORT YOUR SERVER instead of {}
