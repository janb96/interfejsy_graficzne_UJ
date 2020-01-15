let jwt = require('jsonwebtoken');

let config = require('../config');
let ApiUtils = require('./ApiUtils');

function verifyToken(req, res, next) {
    let token = req.headers['x-access-token'];

    if (!token) {
        res
            .status(403)
            .send(ApiUtils.getApiResponse(config.apiErrorType, "There is no token in HTTP request"));
        return;
    }

    jwt.verify(token, config.jwtSecret, function (error, decoded) {
        if (error) {
            res
                .status(500)
                .send(ApiUtils.getApiResponse(config.apiErrorType, "Token could not be verified successfully: " + error.message));
            return;
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;