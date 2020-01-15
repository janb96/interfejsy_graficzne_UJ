let express = require('express');
let router = express.Router();

let config = require('../config');

let ClientModel = require("../model/Client");
let ApiUtils = require('../utils/ApiUtils');
let TokenValidator = require('../utils/TokenValidator');

router.get('/', TokenValidator, function (req, res, next) {
    let cardId = req.cardId;

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

            ApiUtils.sendApiResponse(res, 200, client)
        });
});

router.get('/auth', TokenValidator, function (req, res, next) {
    let cardId = req.cardId;

    let pinCode = req.body.pinCode;

    if (!pinCode) {
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

            if (client.pinCode === pinCode) {
                ApiUtils.sendApiResponse(res, 200, true)
            } else {
                ApiUtils.sendApiResponse(res, 200, false)
            }
        });
});

router.get('/balance', TokenValidator, function (req, res, next) {
    let cardId = req.cardId;

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

            ApiUtils.sendApiResponse(res, 200, client.balance)
        });
});

// router.patch('/pin', TokenValidator, function (req, res, next) {
//     let cardId = req.cardId;
//
//     let oldPinCode = req.body.oldPinCode;
//     let newPinCode = req.body.newPinCode;
//
//     ClientModel
//         .findOne({cardId: cardId}, function (error, client) {
//             if (error) {
//                 ApiUtils.sendApiError(res, 500, error.message);
//                 return;
//             }
//
//             if (!client) {
//                 ApiUtils.sendApiError(res, 500, "Could not get client with card ID = " + cardId + " from credit cards providers databases");
//                 return;
//             }
//
//
//             ApiUtils.sendApiResponse(res, 200, client.balance)
//         });
// });

//ONLY FOR TESTS - DO NOT USE
router.post('/', function (req, res, next) {
    ClientModel
        .create(
            {
                cardId: 1234123412341234,
                pinCode: 6666,
                balance: 12543,
                expirationDate: '2022-01-01'
            },
            function (err, candies) {
                if (err) {
                    ApiUtils.sendApiError(res, 500, err.message);
                    return;
                }
                ApiUtils.sendApiResponse(res, 200, true)
            });
});

module.exports = router;