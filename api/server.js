// BUILD YOUR SERVER HERE
const express = require('express');
const User =require('./users/model')
// const usersRouter = require('./users/usersRouter')

const server = express();

server.use(express.json())

// server.use('/api/users', usersRouter)

server.get('/hello', (req, res)=>{
   res.json({ message: 'hi im here'})
})

// [GET]
server.get('/api/users', async (req, res)=>{
   const allUsers = await User.find()
   try{
      // console.log(`happening`)
      res.json(allUsers)
   } catch(err){
      console.log(err)
   }
})

// [POST] this should be posting all things
// need to allow only ones that have the correct body
server.post('/api/users', async (req, res)=>{
   try{
      if( !req.body.name || !req.body.bio ){
         res.status(400).json({ message: 'provide name and bio'})
      } else{
         const newUser = await User.insert(req.body)
         res.status(201).json(newUser)
      }
   } catch(err){
      console.log(`err`, err)
   }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
