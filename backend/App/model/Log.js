let mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    cardId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number
    }
});

mongoose.model('Log', LogSchema);

module.exports = mongoose.model('Log');