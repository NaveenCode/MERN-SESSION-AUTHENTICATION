const mongoose = require('mongoose');
const colors = require('colors')
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`connected to database:${conn.connection.host}`.yellow)

}

module.exports = connectDB