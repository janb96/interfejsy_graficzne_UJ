let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let config = require('../config');

let ApiUtils = require('../utils/ApiUtils');

router.post('/authenticate', function (req, res, next) {
    let cardId = req.body.cardId;

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

    let token = jwt.sign({cardId: cardId}, config.jwtSecret, {expiresIn: config.jwtTime});

    ApiUtils.sendApiToken(res, 200, token);
});

module.exports = router;