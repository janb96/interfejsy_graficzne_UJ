let mongoose = require('mongoose');

const ATMSchema = new mongoose.Schema({
    inventory: {
        count_50: {
            type: Number,
            required: true,
            default: 0
        },
        count_100: {
            type: Number,
            required: true,
            default: 0
        },
        count_200: {
            type: Number,
            required: true,
            default: 0
        },
        count_500: {
            type: Number,
            required: true,
            default: 0
        },
    }
});

mongoose.model('ATM', ATMSchema);

module.exports = mongoose.model('ATM');