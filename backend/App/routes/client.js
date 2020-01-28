let express = require('express');
let router = express.Router();

let config = require('../config');

let ClientModel = require("../model/Client");
let LogModel = require("../model/Log");
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
                ApiUtils.sendApiError(res, 500, "Nie udało się pobrać danych karty " + cardId);
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
                ApiUtils.sendApiError(res, 500, "Nie udało się pobrać danych karty " + cardId);
                return;
            }

            if (!client.isActive) {
                ApiUtils.sendApiError(res, 500, "Twoja karta nie jest aktywna");
                return;
            }

            let log = new LogModel({
                cardId: cardId,
                date: new Date(),
                type: "check_balance"
            });

            log.save(function (error) {
                if (error) {
                    ApiUtils.sendApiError(res, 500, error.message);
                    return;
                }

                ApiUtils.sendApiResponse(res, 200, client.balance)
            });
        });
});

router.post('/card/pin', TokenValidator, function (req, res, next) {
    let cardId = req.cardId;

    let newPinCode = req.body.newPinCode;

    if (newPinCode === undefined) {
        ApiUtils.sendApiError(res, 500, "Pole 'newPinCode' nie może być puste");
        return;
    }

    if (!/^\d+$/.test(newPinCode)) {
        ApiUtils.sendApiError(res, 500, "Pole 'newPinCode' musi zawierać wyłącznie cyfry");
        return;
    }

    if (newPinCode.toString().length < config.minPinDigits) {
        ApiUtils.sendApiError(res, 500, "Pole 'newPinCode' musi mieć minimum " + config.minPinDigits + " znaków");
        return;
    }

    if (newPinCode.toString().length > config.maxPinDigits) {
        ApiUtils.sendApiError(res, 500, "Pole 'newPinCode' może mieć maksymalnie " + config.maxPinDigits + " znaków");
        return;
    }

    ClientModel
        .findOne({cardId: cardId}, function (error, client) {
            if (error) {
                ApiUtils.sendApiError(res, 500, error.message);
                return;
            }

            if (!client) {
                ApiUtils.sendApiError(res, 500, "Nie udało się pobrać danych karty " + cardId);
                return;
            }

            if (!client.isActive) {
                ApiUtils.sendApiError(res, 500, "Twoja karta nie jest aktywna");
                return;
            }

            if (client.pinCode == newPinCode) {
                ApiUtils.sendApiError(res, 500, "Numer PIN musi byc inny od poprzedniego");
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
                            ApiUtils.sendApiError(res, 500, "Błąd wewnętrzny: nie udało się zmienić numeru PIN");
                            return;
                        }

                        let log = new LogModel({
                            cardId: cardId,
                            date: new Date(),
                            type: "change_pin"
                        });

                        log.save(function (error) {
                            if (error) {
                                ApiUtils.sendApiError(res, 500, error.message);
                                return;
                            }

                            ApiUtils.sendApiResponse(res, 200, true)
                        });
                    });
        });
});

router.post('/card/activate', TokenValidator, function (req, res, next) {
    let cardId = req.cardId;

    let newPinCode = req.body.newPinCode;

    if (newPinCode === undefined) {
        ApiUtils.sendApiError(res, 500, "Pole 'newPinCode' nie może być puste");
        return;
    }

    if (!/^\d+$/.test(newPinCode)) {
        ApiUtils.sendApiError(res, 500, "Pole 'newPinCode' musi mieć wyłącznie cyfry");
        return;
    }

    if (newPinCode.toString().length < config.minPinDigits) {
        ApiUtils.sendApiError(res, 500, "Pole 'newPinCode' musi mieć minumum " + config.minPinDigits + " znaków");
        return;
    }

    if (newPinCode.toString().length > config.maxPinDigits) {
        ApiUtils.sendApiError(res, 500, "Pole 'newPinCode' może mieć maksymalnie " + config.maxPinDigits + " znaków");
        return;
    }

    ClientModel
        .findOne({cardId: cardId}, function (error, client) {
            if (error) {
                ApiUtils.sendApiError(res, 500, error.message);
                return;
            }

            if (!client) {
                ApiUtils.sendApiError(res, 500, "Nie udało się pobrać danych karty " + cardId);
                return;
            }

            if (client.isActive) {
                ApiUtils.sendApiError(res, 500, "Twoja karta jest już aktywna");
                return;
            }

            if (client.pinCode == newPinCode) {
                ApiUtils.sendApiError(res, 500, "Numer PIN musi byc inny od poprzedniego");
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
                            ApiUtils.sendApiError(res, 500, "Błąd wewnętrzny: nie udało się aktywować karty");
                            return;
                        }

                        let log = new LogModel({
                            cardId: cardId,
                            date: new Date(),
                            type: "activate_card"
                        });

                        log.save(function (error) {
                            if (error) {
                                ApiUtils.sendApiError(res, 500, error.message);
                                return;
                            }

                            ApiUtils.sendApiResponse(res, 200, true)
                        });
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