var express = require('express');
var router = express.Router();

const moment = require("moment");

const Receiptdata = [
    {
        "boxType" : "big",
        "receiptAvgTime" : 52,
        "receiptMinTime" : 45,
        "receiptMaxTime" : 60,
    },
    {
        "boxType" : "mid",
        "receiptAvgTime" : 50,
        "receiptMinTime" : 45,
        "receiptMaxTime" : 60,
    }
]

const Issuedata = [
    {
        "boxType" : "big",
        "issueAvgTime" : 53,
        "issueMinTime" : 45,
        "issueMaxTime" : 60,
    },
    {
        "boxType" : "mid",
        "issueAvgTime" : 57,
        "issueMinTime" : 45,
        "issueMaxTime" : 60,
    }
]

const goodsReceiptData = [
    {
        "boxType" : "big",
        "receiptBoxCount": 1254,
        "receiptPartCount" : 6535,
        "receiptDelayCount" : 8
    },
    {
        "boxType" : "mid",
        "receiptBoxCount": 2345,
        "receiptPartCount": 7104,
        "receiptDelayCount": 114
    }
]
    
const goodsIssueData = [
    {
        "boxType" : "big",
        "issuePartCount": 1254,
        "issueSetBoxCount" : 8,
        "discardBoxCount": 1240,
        "issueSetBoxRackCount": 27,
        "issueBoxDelayCount" : 3,
    },
    {
        "boxType" : "mid",
        "issuePartCount": 2480,
        "issueSetBoxCount" : 114,
        "discardBoxCount": 581,
        "issueSetBoxRackCount": 27,
        "issueBoxDelayCount" : 3,
    },
]

function getRandomValue(){
    return Math.floor(Math.random() * (100 - 50 + 1)) + 51;
}
  
const generateStockData = () => {
    let currentTime = moment().valueOf();
    let randomRate1 = getRandomValue();
    let randomRate2 = getRandomValue();
    return {
        "requestTime": currentTime,
        "infos": [
        {
            "boxType": "mid",
            "receiptRate": randomRate1
        },
        {
            "boxType": "big",
            "receiptRate": randomRate2
        },
        ]
    }
}

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get("/receipttime", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(Receiptdata));
});

router.get("/issuetime", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(Issuedata));
});

router.get("/receiptrate", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(generateStockData()));
});
  
router.get("/receiptinfos", function (req, res) {
res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
res.setHeader("Content-Type", "application/json")
res.send(JSON.stringify(goodsReceiptData));
});

router.get("/issueinfos", function (req, res) {
res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
res.setHeader("Content-Type", "application/json")
res.send(JSON.stringify(goodsIssueData));
});

module.exports = router;