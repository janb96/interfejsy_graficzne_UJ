let mongoose = require('mongoose');

const AdvertSchema = new mongoose.Schema({
    adId: {
        type: Number,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
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