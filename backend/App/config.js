module.exports = {
    //API
    'apiErrorType': 'error',
    'apiTokenType': 'token',
    'apiResponseType': 'response',

    //JWT
    'jwtSecret': 'superSecretKeyForTokens',
    'jwtTime': 3600,

    //ATM
    'minPinDigits': 4,
    'maxPinDigits': 6,
    'minDenomination': 50,
    'minWithdraw': 50,
    'maxWithdraw': 10000,
};