let express = require('express');
let router = express.Router();

let config = require('../config');

let ClientModel = require("../model/Client");
let ApiUtils = require('../utils/ApiUtils');
let TokenValidator = require('../utils/TokenValidator');

//ONLY FOR TESTS
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

            if (!client.isActive) {
                ApiUtils.sendApiError(res, 500, "Your card is not active.");
                return;
            }

            ApiUtils.sendApiResponse(res, 200, client.balance)
        });
});

router.patch('/card/pin', TokenValidator, function (req, res, next) {
    let cardId = req.cardId;

    let oldPinCode = req.body.oldPinCode;
    let newPinCode = req.body.newPinCode;

    if (oldPinCode === undefined) {
        ApiUtils.sendApiError(res, 500, "Field 'oldPinCode' could not be empty!");
        return;
    }

    if (!/^\d+$/.test(oldPinCode)) {
        ApiUtils.sendApiError(res, 500, "Field 'oldPinCode' has to have only digits!");
        return;
    }

    if (oldPinCode.toString().length < config.minPinDigits) {
        ApiUtils.sendApiError(res, 500, "Field 'oldPinCode' has to have minimum " + config.minPinDigits + " digits!");
        return;
    }

    if (oldPinCode.toString().length > config.maxPinDigits) {
        ApiUtils.sendApiError(res, 500, "Field 'oldPinCode' has to have maximum " + config.maxPinDigits + " digits!");
        return;
    }

    if (newPinCode === undefined) {
        ApiUtils.sendApiError(res, 500, "Field 'newPinCode' could not be empty!");
        return;
    }

    if (!/^\d+$/.test(newPinCode)) {
        ApiUtils.sendApiError(res, 500, "Field 'newPinCode' has to have only digits!");
        return;
    }

    if (newPinCode.toString().length < config.minPinDigits) {
        ApiUtils.sendApiError(res, 500, "Field 'newPinCode' has to have minimum " + config.minPinDigits + " digits!");
        return;
    }

    if (newPinCode.toString().length > config.maxPinDigits) {
        ApiUtils.sendApiError(res, 500, "Field 'newPinCode' has to have maximum " + config.maxPinDigits + " digits!");
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

            if (!client.isActive) {
                ApiUtils.sendApiError(res, 500, "Card is not active.");
                return;
            }

            if (client.pinCode !== oldPinCode) {
                ApiUtils.sendApiError(res, 500, "PIN code is invalid.");
                return;
            }

            ClientModel
                .update(
                    {cardId: cardId},
                    {pinCode: newPinCode},
                    function (error, data) {
                        if (error) {
                            ApiUtils.sendApiError(res, 500, error.message);
                            return;
                        }

                        if (data.nModified !== 1) {
                            ApiUtils.sendApiError(res, 500, "PIN code was not changed.");
                            return;
                        }

                        ApiUtils.sendApiResponse(res, 200, true)
                    });
        });
});

router.post('/card/activate', TokenValidator, function (req, res, next) {
    let cardId = req.cardId;

    let oldPinCode = req.body.oldPinCode;
    let newPinCode = req.body.newPinCode;

    if (oldPinCode === undefined) {
        ApiUtils.sendApiError(res, 500, "Field 'oldPinCode' could not be empty!");
        return;
    }

    if (!/^\d+$/.test(oldPinCode)) {
        ApiUtils.sendApiError(res, 500, "Field 'oldPinCode' has to have only digits!");
        return;
    }

    if (oldPinCode.toString().length < config.minPinDigits) {
        ApiUtils.sendApiError(res, 500, "Field 'oldPinCode' has to have minimum " + config.minPinDigits + " digits!");
        return;
    }

    if (oldPinCode.toString().length > config.maxPinDigits) {
        ApiUtils.sendApiError(res, 500, "Field 'oldPinCode' has to have maximum " + config.maxPinDigits + " digits!");
        return;
    }

    if (newPinCode === undefined) {
        ApiUtils.sendApiError(res, 500, "Field 'newPinCode' could not be empty!");
        return;
    }

    if (!/^\d+$/.test(newPinCode)) {
        ApiUtils.sendApiError(res, 500, "Field 'newPinCode' has to have only digits!");
        return;
    }

    if (newPinCode.toString().length < config.minPinDigits) {
        ApiUtils.sendApiError(res, 500, "Field 'newPinCode' has to have minimum " + config.minPinDigits + " digits!");
        return;
    }

    if (newPinCode.toString().length > config.maxPinDigits) {
        ApiUtils.sendApiError(res, 500, "Field 'newPinCode' has to have maximum " + config.maxPinDigits + " digits!");
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

            if (client.isActive) {
                ApiUtils.sendApiError(res, 500, "Card was activated already.");
                return;
            }

            if (client.pinCode !== oldPinCode) {
                ApiUtils.sendApiError(res, 500, "PIN code is invalid.");
                return;
            }

            ClientModel
                .update(
                    {cardId: cardId},
                    {
                        pinCode: newPinCode,
                        isActive: true
                    },
                    function (error, data) {
                        if (error) {
                            ApiUtils.sendApiError(res, 500, error.message);
                            return;
                        }

                        if (data.nModified !== 1) {
                            ApiUtils.sendApiError(res, 500, "Error during card activation");
                            return;
                        }

                        ApiUtils.sendApiResponse(res, 200, true)
                    });
        });
});

//ONLY FOR TESTS - DO NOT USE
router.post('/init', function (req, res, next) {
    let clients = [
        {
            cardId: 1234123412341234,
            pinCode: 6666,
            balance: 12543,
            expirationDate: '2022-01-01',
            isActive: false,
            isBlock: false,
            limits: {
                moneyInOneTransaction: 4000,
                moneyInOneDay: 5000,
                transactionPerDay: 2
            }
        }
    ];

    ClientModel
        .insertMany(clients, function (error, clients) {
            if (error) {
                ApiUtils.sendApiError(res, 500, error.message);
                return;
            }

            ApiUtils.sendApiResponse(res, 200, true)
        });
});

module.exports = router;