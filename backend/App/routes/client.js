let express = require('express');
let router = express.Router();

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
                ApiUtils.sendApiError(res, 500, "Could not get client with card ID = " + cardId + " in credit cards providers databases");
                return;
            }

            ApiUtils.sendApiResponse(res, 200, client)
        });
});

module.exports = router;