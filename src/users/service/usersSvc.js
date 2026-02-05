const User = require('../models/User');
const {generateUserPassword, comparePassword} = require('../helpers/bcrypt');
const {signNewToken} = require('../../auth/providers/jwt');
 
// MongoDB operation

const createNewUser = async (user) => {
    // saves the password as plain text:
    try{
        // hash the password before saving to mongoDB:
        user.password = await generateUserPassword(user.password)
        // You overwrite user.password with this hashed version

        let newUser = new User(user);
        // Now when new User(user) creates the Mongoose document, the password field contains the hash, not the plain text
        newUser = await newUser.save();
        // .save() stores the hashed version in MongoDB
        return newUser;
    }
    catch(err){
        throw new Error(err.message)
    }
}

// don't have loginUser function at all:
const loginUser = async ({email, password}) => {
    try{
        // find the user by email in mongoDB
        const user = await User.findOne({email});
        if(!user) throw new Error("Invalid email or password");

        // compare plain password with hashed password form DB
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch) throw new Error("Invalid email or password");

        // password correct --> generate JWT token
        const token = signNewToken(user);
        return token;

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

module.exports = {createNewUser, getUsers, getUser, updateUser, deleteUser, loginUser};