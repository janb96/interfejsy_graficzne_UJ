let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let config = require('../config');

let ClientModel = require("../model/Client");
let LogModel = require("../model/Log");
let ApiUtils = require('../utils/ApiUtils');

router.post('/authenticate', function (req, res, next) {
    let cardId = req.body.cardId;
    let pinCode = req.body.pinCode;

    if (cardId === undefined) {
        ApiUtils.sendApiError(res, 500, "Pole 'cardId' nie może być puste");
        return;
    }

    if (cardId.length !== 16) {
        ApiUtils.sendApiError(res, 500, "Pole 'cardId' musi mieć 16 znaków");
        return;
    }

    if (!/^\d+$/.test(cardId)) {
        ApiUtils.sendApiError(res, 500, "Pole 'cardId' musi mieć wyłącznie cyfry");
        return;
    }

    if (pinCode === undefined) {
        ApiUtils.sendApiError(res, 500, "Pole 'pinCode' nie może być puste");
        return;
    }

    if (!/^\d+$/.test(pinCode)) {
        ApiUtils.sendApiError(res, 500, "Pole 'pinCode' musi mieć wyłącznie cyfry");
        return;
    }

    if (pinCode.toString().length < config.minPinDigits) {
        ApiUtils.sendApiError(res, 500, "Pole 'pinCode' musi mieć minimum " + config.minPinDigits + " znaków");
        return;
    }

    if (pinCode.toString().length > config.maxPinDigits) {
        ApiUtils.sendApiError(res, 500, "Pole 'pinCode' może mieć maksymalnie " + config.maxPinDigits + " znaków");
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

            if (client.isBlocked) {
                ApiUtils.sendApiError(res, 500, "Karta " + cardId + " jest zablokowana. Zostanie zablokowana w bankomacie");
                return;
            }

            if (new Date(client.expirationDate) < new Date()) {
                ApiUtils.sendApiError(res, 500, "Twoja karta wygasła");
                return;
            }

            if (client.pinCode !== parseInt(pinCode)) {
                console.log(pinCode);
                console.log(client.pinCode);

                ApiUtils.sendApiError(res, 500, "Kod PIN jest błędny");
                return;
            }

            let token = jwt.sign({cardId: cardId}, config.jwtSecret, {expiresIn: config.jwtTime});

            let log = new LogModel({
                cardId: cardId,
                date: new Date(),
                type: "log_in"
            });

            log.save(function (error) {
                if (error) {
                    ApiUtils.sendApiError(res, 500, error.message);
                    return;
                }

                ApiUtils.sendApiToken(res, 200, token);
            });
        });
});

module.exports = router;