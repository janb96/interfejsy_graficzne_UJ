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
        ApiUtils.sendApiError(res, 500, "Field 'amount' could not be empty!");
        return;
    }

    if (!/^\d+$/.test(amount)) {
        ApiUtils.sendApiError(res, 500, "Field 'amount' has to number!");
        return;
    }

    if (amount < config.minWithdraw) {
        ApiUtils.sendApiError(res, 500, "Field 'amount' has to be minimum " + config.minWithdraw);
        return;
    }

    if (amount > config.maxWithdraw) {
        ApiUtils.sendApiError(res, 500, "Field 'amount' has to be maximum " + config.maxWithdraw);
        return;
    }

    if (amount % config.minDenomination !== 0) {
        ApiUtils.sendApiError(res, 500, "Field 'amount' has to be factor of " + config.minDenomination);
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
                ApiUtils.sendApiError(res, 500, "Your card is not active.");
                return;
            }

            let balance = client.balance;
            let moneyInOneTransactionLimit = client.limits.moneyInOneTransaction;

            if (amount > balance) {
                ApiUtils.sendApiError(res, 500, "You do not have enough money on your account");
                return;
            }

            if (amount > moneyInOneTransactionLimit) {
                ApiUtils.sendApiError(res, 500, "Demand amount is above limit: money per transaction is " + moneyInOneTransactionLimit);
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
                            ApiUtils.sendApiError(res, 500, "Exceed limit of transaction per day: " + todayDays);
                            return;
                        }

                        if (todayMoney > client.limits.moneyInOneDay) {
                            ApiUtils.sendApiError(res, 500, "Exceed limit of amount of money per day: " + todayMoney);
                            return;
                        }

                        ATMModel
                            .find(function (error, atm) {
                                if (error) {
                                    ApiUtils.sendApiError(res, 500, error.message);
                                    return;
                                }

                                if (atm.length !== 1) {
                                    ApiUtils.sendApiError(res, 500, "Error during withdraw");
                                    return;
                                }

                                let count_20 = 0;
                                let count_50 = atm[0].inventory.count_50;
                                let count_100 = atm[0].inventory.count_100;
                                let count_200 = atm[0].inventory.count_200;
                                let count_500 = atm[0].inventory.count_500;

                                let sum = count_50 * 50 + count_100 * 100 + count_200 * 200 + count_500 * 500;

                                if (amount > sum) {
                                    ApiUtils.sendApiError(res, 500, "There is no enough money in ATM!");
                                    return;
                                }

                                let availableMoneyArray = [count_500, count_200, count_100, count_50, count_20];

                                let withdrawResult = ATMUtils.withdraw(amount, availableMoneyArray);

                                if (withdrawResult[0] === false) {
                                    ApiUtils.sendApiError(res, 500, "Error during withdraw");
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
                                                ApiUtils.sendApiError(res, 500, "Error during withdraw");
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
                                                            ApiUtils.sendApiError(res, 500, "Error during withdraw");
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