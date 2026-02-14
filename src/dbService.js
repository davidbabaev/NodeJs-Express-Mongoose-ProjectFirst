const mongoose = require('mongoose');

const connectToDB = async() => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('connected to mongoDB');
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = connectToDB; // <- () calls the function immidiatly, we don't need them here