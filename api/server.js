// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model.js')

const server = express()
server.use(express.json())


server.get('/api/users', async(req, res) => {
    try {
        const users = await User.find()
        if(!users) {
            res.status(404).json({message: 'The users information could not be retrieved'})
        } else {
            res.status(200).json(users)
        }
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

server.get('/api/users/:id', async(req,res) => {
    console.log(req.method)
    console.log(req.headers)
    console.log(req.body)
    console.log(req.params)
    try {
        const {id} =req.params
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({message: 'The user with the specified ID does not exist'})
        } else {
            res.status(200).json(user)
        }
        
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

server.post('/api/users', async(req, res) => {
    try {
        const {name, bio} = req.body
        console.log(name, bio)
        const newUser = await User.insert({name, bio})
        console.log(newUser)
        if(!name || !bio) {
            res.status(400).json({message: 'Please provide name and bio for the user'})
        } else {
            res.status(201).json(newUser)
        }
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

server.put('/api/users/:id', async(req, res) => {
    const {id} = req.params
    const{name, bio} = req.body
    console.log(id, name, bio)
    try {
        const updateUser = await User.update(id, {name, bio})
        if (!updateUser) {
            res.status(404).json({message: 'The user with the specified ID does not exist'})
        } else if (!name || !bio) { 
            res.status(400).json({message: 'Please provide name and bio for the user'})
        } else {
            res.json(updateUser)
        }
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

server.delete('/api/users/:id', async(req, res) => {
    const {id} = req.params
    try {
        const deleteUser = await User.remove(id)
        if(!deleteUser) {
            res.status(404).json({message: 'The user with the specified ID does not exist'})
        } else {
            res.json(deleteUser)
        }
    } catch(err) {
        res.status(500).json({message: 'The user could not be removed'})
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
