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
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    pinCode: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    limits: {
        moneyInOneTransaction: {
            type: Number,
            required: true,
            default: 3000
        },
        moneyInOneDay: {
            type: Number,
            required: true,
            default: 10000
        },
        transactionPerDay: {
            type: Number,
            required: true,
            default: 10
        }
    }
});

mongoose.model('Client', ClientSchema);

module.exports = mongoose.model('Client');