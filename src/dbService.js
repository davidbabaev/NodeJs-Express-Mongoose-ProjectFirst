const mongoose = require('mongoose');

const connectToDB = async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/newCardsData')
        console.log('connected to mongoDB');
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = connectToDB; // <- () calls the function immidiatly, we don't need them here