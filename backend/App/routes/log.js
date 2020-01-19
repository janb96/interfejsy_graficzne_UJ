let express = require('express');
let router = express.Router();

let TokenValidator = require('../utils/TokenValidator');
let LogModel = require("../model/Log");
let ApiUtils = require('../utils/ApiUtils');

router.post('/', TokenValidator, function (req, res, next) {
    let cardId = req.cardId;
    let type = req.body.type;
    let amount = req.body.amount;

    if (type === undefined) {
        ApiUtils.sendApiError(res, 500, "Field 'type' count not be empty");
        return;
    }

    let log;
    if (amount !== undefined) {
        log = new LogModel({
            cardId: cardId,
            date: new Date(),
            type: type,
            amount: amount
        });
    } else {
        log = new LogModel({
            cardId: cardId,
            date: new Date(),
            type: type,
        });
    }

    log.save(function (error) {
        if (error) {
            ApiUtils.sendApiError(res, 500, error.message);
            return;
        }

        ApiUtils.sendApiResponse(res, 200, true)
    });
});

module.exports = router;