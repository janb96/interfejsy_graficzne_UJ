let express = require('express');
let router = express.Router();

let ObjectId = require('mongodb').ObjectId;

let config = require('../config');

let TokenValidator = require('../utils/TokenValidator');
let ATMModel = require("../model/ATM");
let ClientModel = require("../model/Client");
let LogModel = require("../model/Log");
let ApiUtils = require('../utils/ApiUtils');
let ATMUtils = require('../utils/ATMUtils');

router.post('/withdraw', TokenValidator, function (req, res, next) {
    let cardId = req.cardId;
    let amount = req.body.amount;

    if (amount === undefined) {
        ApiUtils.sendApiError(res, 500, "Pole 'amount' nie może być puste");
        return;
    }

    if (!/^\d+$/.test(amount)) {
        ApiUtils.sendApiError(res, 500, "Pole 'amount' musi być liczbą");
        return;
    }

    if (amount < config.minWithdraw) {
        ApiUtils.sendApiError(res, 500, "Pole 'amount' musi mieć minimum " + config.minWithdraw);
        return;
    }

    if (amount > config.maxWithdraw) {
        ApiUtils.sendApiError(res, 500, "Pole 'amount' może być maksymalnie " + config.maxWithdraw);
        return;
    }

    if (amount % config.minDenomination !== 0) {
        ApiUtils.sendApiError(res, 500, "Pole 'amount' musi być dzielnikiem " + config.minDenomination);
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

            let balance = client.balance;
            let moneyInOneTransactionLimit = client.limits.moneyInOneTransaction;

            if (amount > balance) {
                ApiUtils.sendApiError(res, 500, "Nie masz wystarczających środków na koncie");
                return;
            }

            if (amount > moneyInOneTransactionLimit) {
                ApiUtils.sendApiError(res, 500, "Wybrana kwota jest powyżej limity: maksymalna kwota transakcji " + moneyInOneTransactionLimit);
                return;
            }

            let today = new Date();
            let tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            LogModel
                .find(
                    {
                        date: {
                            "$gte": new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                            "$lt": new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
                        },
                        type: "withdraw"
                    }, function (error, logs) {
                        if (error) {
                            ApiUtils.sendApiError(res, 500, error.message);
                            return;
                        }

                        let todayDays = 0;
                        let todayMoney = 0;
                        for (let i in logs) {
                            let log = logs[i];
                            todayDays++;
                            todayMoney += log.amount;
                        }

                        if (todayDays === client.limits.transactionPerDay) {
                            ApiUtils.sendApiError(res, 500, "Przekroczono dzienny limit transakcji: " + todayDays);
                            return;
                        }

                        if (todayMoney > client.limits.moneyInOneDay) {
                            ApiUtils.sendApiError(res, 500, "Przekroczono dzienny limit kwotowy transakcji: " + todayMoney);
                            return;
                        }

                        ATMModel
                            .find(function (error, atm) {
                                if (error) {
                                    ApiUtils.sendApiError(res, 500, error.message);
                                    return;
                                }

                                if (atm.length !== 1) {
                                    ApiUtils.sendApiError(res, 500, "Bład wewnętrzny: nie udało się wypłacić pieniędzy");
                                    return;
                                }

                                let count_20 = 0;
                                let count_50 = atm[0].inventory.count_50;
                                let count_100 = atm[0].inventory.count_100;
                                let count_200 = atm[0].inventory.count_200;
                                let count_500 = atm[0].inventory.count_500;

                                let sum = count_50 * 50 + count_100 * 100 + count_200 * 200 + count_500 * 500;

                                if (amount > sum) {
                                    ApiUtils.sendApiError(res, 500, "Nie ma wystarczających środków w bankomacie");
                                    return;
                                }

                                let availableMoneyArray = [count_500, count_200, count_100, count_50, count_20];

                                let withdrawResult = ATMUtils.withdraw(amount, availableMoneyArray);

                                if (withdrawResult[0] === false) {
                                    ApiUtils.sendApiError(res, 500, "Nie ma wystarczających środków w bankomacie");
                                    return;
                                }

                                ClientModel
                                    .update(
                                        {cardId: cardId},
                                        {balance: balance - amount},
                                        function (error, data) {
                                            if (error) {
                                                ApiUtils.sendApiError(res, 500, error.message);
                                                return;
                                            }

                                            if (data.nModified !== 1) {
                                                ApiUtils.sendApiError(res, 500, "Bład wewnętrzny: nie udało się wypłacić pieniędzy");
                                                return;
                                            }

                                            ATMModel
                                                .update(
                                                    {_id: ObjectId(atm[0]._id)},
                                                    {
                                                        inventory: {
                                                            count_500: count_500 + withdrawResult[1][0],
                                                            count_200: count_200 + withdrawResult[1][1],
                                                            count_100: count_100 + withdrawResult[1][2],
                                                            count_50: count_50 + withdrawResult[1][3]
                                                        }
                                                    },
                                                    function (error, data) {
                                                        if (error) {
                                                            ApiUtils.sendApiError(res, 500, error.message);
                                                            return;
                                                        }

                                                        if (data.nModified !== 1) {
                                                            ApiUtils.sendApiError(res, 500, "Bład wewnętrzny: nie udało się wypłacić pieniędzy");
                                                            return;
                                                        }

                                                        let log = new LogModel({
                                                            cardId: cardId,
                                                            date: new Date(),
                                                            type: "withdraw",
                                                            amount: amount
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
                    });

        });
});

//ONLY FOR TESTS
router.post('/init', function (req, res, next) {
    let inventory = [
        {
            inventory: {
                count_50: 100,
                count_100: 50,
                count_200: 20,
                count_500: 10
            }
        }
    ];

    ATMModel
        .insertMany(inventory, function (error, inventory) {
            if (error) {
                ApiUtils.sendApiError(res, 500, error.message);
                return;
            }

            ApiUtils.sendApiResponse(res, 200, true)
        });
});

module.exports = router;