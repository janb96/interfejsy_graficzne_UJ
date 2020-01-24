let express = require('express');
let router = express.Router();

let TokenValidator = require('../utils/TokenValidator');
let AdvertModel = require("../model/Advert");
let ClientModel = require("../model/Client");
let ApiUtils = require('../utils/ApiUtils');

router.get('/', function (req, res, next) {
    AdvertModel
        .count()
        .exec(function (error, adverts) {
            if (error) {
                ApiUtils.sendApiError(res, 500, error.message);
                return;
            }

            if (adverts < 1) {
                ApiUtils.sendApiError(res, 500, "Nie ma żadnych reklam do wyświetlenia");
            }

            let randomAdvert = Math.floor(Math.random() * adverts);

            AdvertModel
                .findOne()
                .skip(randomAdvert)
                .exec(function (error, advert) {
                    if (error) {
                        ApiUtils.sendApiError(res, 500, error.message);
                        return;
                    }

                    if (!advert) {
                        ApiUtils.sendApiError(res, 500, "Błąd wewnętrzny: nie udało sie pobrać reklamy");
                        return;
                    }

                    ApiUtils.sendApiResponse(res, 200, advert)
                })
        })
});

router.get('/personalized', TokenValidator, function (req, res, next) {
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

            let clientMoney = client.balance;

            AdvertModel
                .find(
                    {
                        minMoney: {$lte: clientMoney},
                        maxMoney: {$gte: clientMoney}
                    }, function (error, adverts) {
                        if (error) {
                            ApiUtils.sendApiError(res, 500, error.message);
                            return;
                        }

                        if (!adverts) {
                            ApiUtils.sendApiError(res, 500, "Błąd wewnętrzny: nie udało sie pobrać spersonalizowanej reklamy");
                            return;
                        }

                        let advert = adverts[Math.floor(Math.random() * adverts.length)];

                        ApiUtils.sendApiResponse(res, 200, advert)
                    })
        });
});

//ONLY FOR TESTS
router.post('/init', function (req, res, next) {
    let adverts = [
        {
            link: "https://i.wpimg.pl/O/644x482/i.wp.pl/a/f/jpeg/27623/t-mobile-logo-660.jpeg",
            description: 'T-Mobile'
        },
        {
            link: "https://www.portlodz.pl/-/media/images/b2c/poland/shared/shop-logo/pl_logo_play.jpg",
            description: 'Play'
        },
        {
            link: "https://liberokatowice.pl/wp-content/uploads/2018/09/biedronka-biedronka-kolor-512x251.png",
            description: 'Biedronka',
            minMoney: 0,
            maxMoney: 100
        },
        {
            link: "https://http2.mlstatic.com/iphone-11-novo-2-cameras-D_NQ_NP_652178-MLB32265674579_092019-F.jpg",
            description: 'Apple iPhone',
            minMoney: 200,
            maxMoney: 1000
        },
        {
            link: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/model/aventador/aventador-svj-roadster/car/SVJ_Roadster_gateway%20modelli.png",
            description: 'Lamborghini',
            minMoney: 2000,
            maxMoney: 10000000
        }
    ];

    AdvertModel
        .insertMany(adverts, function (error, adverts) {
            if (error) {
                ApiUtils.sendApiError(res, 500, error.message);
                return;
            }

            ApiUtils.sendApiResponse(res, 200, true)
        });
});


module.exports = router;