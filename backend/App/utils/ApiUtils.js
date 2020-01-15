let config = require('../config');

class ApiResponse {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}

exports.getApiResponse = function (type, payload) {
    return new ApiResponse(type, payload)
};

exports.sendApiToken = function (res, code, payload) {
    res
        .status(code)
        .send(JSON.stringify(this.getApiResponse(config.apiTokenType, payload)))
        .end();
};

exports.sendApiError = function (res, code, payload) {
    res
        .status(code)
        .send(JSON.stringify(this.getApiResponse(config.apiErrorType, payload)))
        .end();
};