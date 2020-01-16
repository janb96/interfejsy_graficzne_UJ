let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let config = require('../config');

let ClientModel = require("../model/Client");
let ApiUtils = require('../utils/ApiUtils');

router.post('/authenticate', function (req, res, next) {
    let cardId = req.body.cardId;
    let pinCode = req.body.pinCode;

    if (cardId === undefined) {
        ApiUtils.sendApiError(res, 500, "Field 'cardId' could not be empty!");
        return;
    }

    if (cardId.length !== 16) {
        ApiUtils.sendApiError(res, 500, "Field 'cardId' has to have 16 chars!");
        return;
    }

    if (!/^\d+$/.test(cardId)) {
        ApiUtils.sendApiError(res, 500, "Field 'cardId' has to have only digits!");
        return;
    }

    if (pinCode === undefined) {
        ApiUtils.sendApiError(res, 500, "Field 'pinCode' could not be empty!");
        return;
    }

    if (!/^\d+$/.test(pinCode)) {
        ApiUtils.sendApiError(res, 500, "Field 'pinCode' has to have only digits!");
        return;
    }

    if (pinCode.length < config.minPinDigits) {
        ApiUtils.sendApiError(res, 500, "Field 'pinCode' has to have minimum " + config.minPinDigits + " digits!");
        return;
    }
    
    if (pinCode.length > config.maxPinDigits) {
        ApiUtils.sendApiError(res, 500, "Field 'pinCode' has to have maximum " + config.maxPinDigits + " digits!");
        return;
    }

    ClientModel
        .findOne({cardId: cardId}, function (error, client) {
            if (error) {
                ApiUtils.sendApiError(res, 500, error.message);
                return;
            }

            if (!client) {
                ApiUtils.sendApiError(res, 500, "Could not get client with card ID = " + cardId + " from credit cards providers databases");
                return;
            }

            if (client.isBlocked) {
                ApiUtils.sendApiError(res, 500, "Card " + cardId + " is blocked. Card will be lock in ATM.");
                return;
            }

            if (client.pinCode !== pinCode) {
                ApiUtils.sendApiError(res, 500, "PIN code is invalid.");
                return;
            }

            //TODO check expiration date

            let token = jwt.sign({cardId: cardId}, config.jwtSecret, {expiresIn: config.jwtTime});

            ApiUtils.sendApiToken(res, 200, token);
        });
});

module.exports = router;