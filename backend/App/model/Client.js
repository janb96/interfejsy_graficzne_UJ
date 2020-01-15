let mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    cardId: {
        type: String,
        required: true,
        unique: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

mongoose.model('Client', ClientSchema);

module.exports = mongoose.model('Client');