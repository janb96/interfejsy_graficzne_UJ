let mongoose = require('mongoose');

let ExampleSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    }
});

mongoose.model('Example', ExampleSchema);

module.exports = mongoose.model('Example');