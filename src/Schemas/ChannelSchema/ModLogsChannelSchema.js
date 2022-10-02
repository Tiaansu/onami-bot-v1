const {
    Schema,
    model
} = require('mongoose');

module.exports = model(
    'moderator_logs_channel',
    new Schema({
        Guild: String,
        Channel: String,
        Author: String,
        Activated: Boolean
    })
)