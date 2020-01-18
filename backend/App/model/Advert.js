let mongoose = require('mongoose');

const AdvertSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    minMoney: {
        type: Number,
    },
    maxMoney: {
        type: Number,
    }
});

mongoose.model('Advert', AdvertSchema);

module.exports = mongoose.model('Advert');