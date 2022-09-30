const mongoose = require("mongoose");
require('dotenv').config();
const client = require('./Bot').client;
const Logger = require("./Functions/Logger");

module.exports = async () => {
    await mongoose.connect(client.development.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return mongoose;
}

mongoose.connection.on('connected', () => {
    Logger.log('Connected to the database');
})