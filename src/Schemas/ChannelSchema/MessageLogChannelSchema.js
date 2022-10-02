const {
    Schema,
    model
} = require('mongoose');

module.exports = model(
    'message_log_channel',
    new Schema({
        Guild: String,
        Channel: String,
        Author: String,
        Activated: Boolean
    })
)