const mongoose = require('mongoose');
require('dotenv').config();
const Logger = require('./Functions/LoggerFunction');

module.exports = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return mongoose;
}

mongoose.connection.on('connected', () => {
    Logger.log('Connected to the database');
})