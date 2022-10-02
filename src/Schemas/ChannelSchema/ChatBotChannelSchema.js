const {
    Schema,
    model
} = require('mongoose');

module.exports = model(
    'chatbot_channel',
    new Schema({
        Guild: String,
        Channel: String,
        Author: String,
        Activated: Boolean
    })
)