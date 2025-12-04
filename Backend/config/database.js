const mongoose = require('mongoose')
require('dotenv').config();

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    }catch(err){
        console.log("Database connection failed", err);
    }
}

module.exports = connectDb;