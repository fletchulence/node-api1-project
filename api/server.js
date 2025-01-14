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
      res.json(allUsers)
   } catch(err){
      res.status(500).json({ message: 'The users information could not be retrieved'})
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
      res.status(500).json({ message: 'There was an error while saving the user to the database'})
   }
})

// [GET] getById
server.get('/api/users/:id', async (req, res)=>{
   const { id }  = req.params
   const user = await User.findById(id)
   try{
      if( !user ){
         console.log(id)
         res.status(404).json({ message: 'The user with the specified ID does not exist'})
      } else{
         res.status(200).json(user)
      }
   } catch(err){
      res.status(500).json({ message: err.message })
   }
})

server.delete('/api/users/:id', async (req, res)=>{
   const { id } = req.params;
   const user = await User.findById( id )
   // const user = await User.remove( id )
  try{
     if ( !user ){
        res.status(404).json({ message: 'The user with the specified ID does not exist' })
     } else{
        const deletedUser = await User.remove( id )
        res.json(deletedUser)
     }
  }catch(err){
     res.status(500).json({ message: 'The user could not be removed'})
  }
})

server.put('/api/users/:id', async (req, res)=>{
   const { id } = req.params
   // const { name, bio } = req.body
   const updatedUser = await User.update( id, req.body )
   try{
      if ( !updatedUser ){
         res.status(404).json({ message: 'The user with the specified ID does not exist'})
      } else if ( !req.body.name || !req.body.bio ){
         res.status(400).json({ message: 'Please provide name and bio for the user'})
      } else{
         res.json( updatedUser )
      }
   } catch(err){
      res.status(500).json({ message: 'The user information could not be modified'})
   }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
