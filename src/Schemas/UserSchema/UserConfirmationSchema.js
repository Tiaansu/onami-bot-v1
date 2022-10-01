const {
    Schema,
    model
} = require('mongoose');

module.exports = model(
    "UserConfirmation",
    new Schema({
        user_id: String
    })
)