const User = require('../models/User');

// MongoDB functions

const createNewUser = async (user) => {
    try{
        let newUser = new User(user);
        newUser = await newUser.save();
        return newUser;
    }
    catch(err){
        throw new Error(err.message)
    }
}

const getUsers = async () => {
    try{
        const users = await User.find();
        return users;
    }
    catch(err){
        throw new Error(err.message)
    }
}

const getUser = async (userId) => {
    try{
        const user = await User.findById(userId);
        return user;
    }
    catch(err){
        throw new Error(err.message)
    }
}

const updateUser = async (userId, content) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(userId, content, {new: true});
        return updatedUser;
    }
    catch(err){
        throw new Error(err.message);
    }
}

const deleteUser = async (userId) => {
    try{
        const deleted = await User.findByIdAndDelete(userId); 
        return deleted;
    }
    catch(err){
        throw new Error(err.message)
    }
}

// 

module.exports = {createNewUser, getUsers, getUser, updateUser, deleteUser};