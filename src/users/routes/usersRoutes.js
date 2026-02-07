// CRUD operations - requests:

const express = require('express');
const router = express.Router();

const {
    createNewUser, 
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser,
    loginUser,
} = require('../service/usersSvc')


router.get('/users', async (req, res) => {
    try{
        const users = await getUsers();
        res.send(users);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.get('/users/:id', async (req, res) => {
    try{
        const user = await getUser(req.params.id);
        res.send(user);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.post('/users', async (req, res) => {
    try{
        const newUser = await createNewUser(req.body);
        res.send(newUser);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

router.post('/users/login', async (req,res) => {
    try{
        const token = await loginUser(req.body);
        res.send(token);
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

router.put('/users/:id', async (req, res) => {
    try{
        let updatedUser = await updateUser(req.params.id, req.body)
        res.send(updatedUser);
    }   
    catch(err){
        res.status(400).send(err.message)
    }
})

router.delete('/users/:id', async (req, res) => {
    try{
        const deletedUser = await deleteUser(req.params.id);
        res.send(deletedUser);
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = router;
