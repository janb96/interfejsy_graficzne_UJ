let express = require('express');
let router = express.Router();

const ExampleModel = require('../model/Example');

//ROUTER ONLY FOR TESTS

router.get('/', function (req, res) {
    ExampleModel
        .find()
        .then(examples => {
           res.json(examples)
        })
        .catch(reason => {
            res.error(reason.message)
        });
});

router.post('/doladujBankomat', function (req, res) {
    let correctValues = ["10", "20", "50", "100", "200", "500"];

    let value = req.body.value;
    let amount = req.body.amount;

    if (value === undefined) {
        sendError(res, 500, "`Value` can not be empty!");
        return;
    }

    if (amount === undefined) {
        sendError(res, 500, "`Amount` can not be empty!");
        return;
    }

    if(!correctValues.includes(value)){
        sendError(res, 500, "Value is not correct!");
        return;
    }

    if(amount < 1){
        sendError(res, 500, "Amount can not be lower than 1!");
        return;
    }

    ExampleModel
        .create({
            value: value,
            amount: amount
        })
        .then(_ => {
            res.json("OK")
        })
        .catch(reason => {
            sendError(res, 500, "Couldn't create: " + reason.message);
        })
});

function sendError(res, code, message) {
    res
        .status(code)
        .json(message)
        .end();
}

module.exports = router;