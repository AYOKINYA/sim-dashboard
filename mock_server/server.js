
const express = require("express");
const app = express();
const port = 4000;
const cors = require('cors');
const moment = require("moment");

const server = app.listen(`${port}`, function() {
    console.log(`Server started on port ${port}`);
  });

const corsOptions = {
                origin: "http://localhost:9999",
                methods: ["GET", "POST"]
            }

app.use(cors(corsOptions));

const Receiptdata = 
[
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
const Issuedata = 
[
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

const simReal3530 = [
  {
    "workType" : "Setbox(M)",
    "infos": [
        {
            "time": "2020-05-01:05:00",
            "value": 75.6073
        },
        {
            "time": "2020-05-01:10:00",
            "value": 78.9077
        },
        {
            "time": "2020-05-01:15:00",
            "value": 77.6073
        },
        {
            "time": "2020-05-01:20:00",
            "value": 81.9077
        },
        {
            "time": "2020-05-01:25:00",
            "value": 75.6073
        },
        {
            "time": "2020-05-01:30:00",
            "value": 87.9077
        },
        {
            "time": "2020-05-01:35:00",
            "value": 77.6073
        },
        {
            "time": "2020-05-01:40:00",
            "value": 83.9077
        }
    ],
  },
  {
    "workType" : "Setbox(B)",
    "infos": [
      {
          "time": "2020-05-01:05:00",
          "value": 75.6073
      },
      {
          "time": "2020-05-01:10:00",
          "value": 85.9077
      },
      {
          "time": "2020-05-01:15:00",
          "value": 77.6073
      },
      {
          "time": "2020-05-01:20:00",
          "value": 81.9077
      },
      {
          "time": "2020-05-01:25:00",
          "value": 75.6073
      },
      {
          "time": "2020-05-01:30:00",
          "value": 87.9077
      },
      {
          "time": "2020-05-01:35:00",
          "value": 77.6073
      },
      {
          "time": "2020-05-01:40:00",
          "value": 83.9077
      }
    ],
  },
  {
    "workType": "SetboxRack",
    "infos": [
      {
          "time": "2020-05-01:05:00",
          "value": 75.6073
      },
      {
          "time": "2020-05-01:10:00",
          "value": 85.9077
      },
      {
          "time": "2020-05-01:15:00",
          "value": 77.6073
      },
      {
          "time": "2020-05-01:20:00",
          "value": 81.9077
      },
      {
          "time": "2020-05-01:25:00",
          "value": 75.6073
      },
      {
          "time": "2020-05-01:30:00",
          "value": 87.9077
      },
      {
          "time": "2020-05-01:35:00",
          "value": 77.6073
      },
      {
          "time": "2020-05-01:40:00",
          "value": 83.9077
      }
    ],
  }
]

const simResult3530 = [
  {
    "workType" : "Setbox(M)",
    "infos": [
        {
            "time": "2020-05-01:05:00",
            "value": 95.6073
        },
        {
            "time": "2020-05-01:10:00",
            "value": 75.9077
        },
        {
            "time": "2020-05-01:15:00",
            "value": 79.6073
        },
        {
            "time": "2020-05-01:20:00",
            "value": 51.9077
        },
        {
            "time": "2020-05-01:25:00",
            "value": 55.6073
        },
        {
            "time": "2020-05-01:30:00",
            "value": 81.9077
        },
        {
            "time": "2020-05-01:35:00",
            "value": 87.6073
        },
        {
            "time": "2020-05-01:40:00",
            "value": 60.9077
        }
    ],
  },
  {
    "workType" : "Setbox(B)",
    "infos": [
      {
          "time": "2020-05-01:05:00",
          "value": 95.6073
      },
      {
          "time": "2020-05-01:10:00",
          "value": 75.9077
      },
      {
          "time": "2020-05-01:15:00",
          "value": 79.6073
      },
      {
          "time": "2020-05-01:20:00",
          "value": 51.9077
      },
      {
          "time": "2020-05-01:25:00",
          "value": 55.6073
      },
      {
          "time": "2020-05-01:30:00",
          "value": 81.9077
      },
      {
          "time": "2020-05-01:35:00",
          "value": 87.6073
      },
      {
          "time": "2020-05-01:40:00",
          "value": 60.9077
      }
    ],
  },
  {
    "workType": "SetboxRack",
    "infos": [
      {
          "time": "2020-05-01:05:00",
          "value": 95.6073
      },
      {
          "time": "2020-05-01:10:00",
          "value": 75.9077
      },
      {
          "time": "2020-05-01:15:00",
          "value": 79.6073
      },
      {
          "time": "2020-05-01:20:00",
          "value": 51.9077
      },
      {
          "time": "2020-05-01:25:00",
          "value": 55.6073
      },
      {
          "time": "2020-05-01:30:00",
          "value": 81.9077
      },
      {
          "time": "2020-05-01:35:00",
          "value": 87.6073
      },
      {
          "time": "2020-05-01:40:00",
          "value": 60.9077
      }
    ],
  }
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

const SimulationHistory = [
    {
        "simulationId" : 2458,
        "seq" : 1,
        "comments" : "Test 1",
        "startDate" : "2021-10-13 22:43",
        "endDate" : "2021-10-18 22:43"
    },
    {
        "simulationId" : 3530,
        "seq" : 2,
        "comments" : "Test for Pilot",
        "startDate" : "2021-10-18 22:43",
        "endDate" : "2021-10-20 22:43"
    },
    {
        "simulationId" : 4540,
        "seq" : 3,
        "comments" : "Etc.",
        "startDate" : "2021-10-17 22:43",
        "endDate" : "2021-10-22 22:43"
    },
    {
        "simulationId" : 4242,
        "seq" : 4,
        "comments" : "Test 1",
        "startDate" : "2021-10-13 22:43",
        "endDate" : "2021-10-18 22:43"
    },
    {
        "simulationId" : 9876,
        "seq" : 5,
        "comments" : "Test for Pilotaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "startDate" : "2021-10-18 22:43",
        "endDate" : "2021-10-20 22:43"
    },
    {
        "simulationId" : 6666,
        "seq" : 6,
        "comments" : "Etc.",
        "startDate" : "2021-10-17 22:43",
        "endDate" : "2021-10-22 22:43"
    },
    {
        "simulationId" : 7878,
        "seq" : 7,
        "comments" : "Test 1",
        "startDate" : "2021-10-13 22:43",
        "endDate" : "2021-10-18 22:43"
    },
    {
        "simulationId" : 8523,
        "seq" : 8,
        "comments" : "Test for Pilot",
        "startDate" : "2021-10-18 22:43",
        "endDate" : "2021-10-20 22:43"
    },
    {
        "simulationId" : 4563,
        "seq" : 9,
        "comments" : "Etc.",
        "startDate" : "2021-10-17 22:43",
        "endDate" : "2021-10-22 22:43"
    },
    

];

const tmpHistory = [
    {
        "simulationId" : 2458,
        "seq" : 1,
        "comments" : "Test 1",
        "startDate" : "2021-10-13 22:43",
        "endDate" : "2021-10-18 22:43"
    },
]

app.get("/dashboard/receipttime", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(Receiptdata));
});

app.get("/dashboard/issuetime", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(Issuedata));
});

app.get("/simulation/history/3530/comparison/real", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(simReal3530));
});

app.get("/simulation/history/3530/comparison/results", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(simResult3530));
});

app.get("/dashboard/receiptrate", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(generateStockData()));
});

app.get("/dashboard/receiptinfos", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(goodsReceiptData));
});

app.get("/dashboard/issueinfos", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(goodsIssueData));
});

app.get("/simulation/history", function (req, res) {
    // add request parameter parse logic
    console.log("request params for: /simulation/history/")
    console.log(req.query)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    if (req.query.startDate === '20211110')
        res.send(JSON.stringify(tmpHistory));
    else
        res.send(JSON.stringify(SimulationHistory));
        // res.send(JSON.stringify([]));
});

const SummaryData = [
    {
        "SimulationNumber": 2458,
        "SetBoxBigBoxSimulationCount" : 500,
        "SetBoxBigBoxRealCount" : 270,
        "SetBoxMidBoxSimulationCount" : 500,
        "SetBoxMidBoxRealCount" : 80,
        "SetBoxRackSimulationCount" : 500,
        "SetBoxRackRealCount" : 450, 
        "PartsReleaseSimulationCount" : 500,
        "PartsReleaseRealCount" : 320,
    },
    {
        "SimulationNumber": 4540,
        "SetBoxBigBoxSimulationCount" : 500,
        "SetBoxBigBoxRealCount" : 220,
        "SetBoxMidBoxSimulationCount" : 500,
        "SetBoxMidBoxRealCount" : 80,
        "SetBoxRackSimulationCount" : 500,
        "SetBoxRackRealCount" : 450, 
        "PartsReleaseSimulationCount" : 500,
        "PartsReleaseRealCount" : 320,
    }
];

// #2458 
const SummaryData1 = [
    {
        "summaryType" : "real",
        "delayCount" : 530,
        "infos" : [
            {
                "workType" : "big",
                "workQuantity" : 600
            },
            {
                "workType" : "mid",
                "workQuantity" : 500
            },
            {
                "workType" : "rack",
                "workQuantity" : 450
            }
        ]
    },
    {
        "summaryType" : "simulation",
        "delayCount" : 270,
        "infos" : [
            {
                "workType" : "big",
                "workQuantity" : 270
            },
            {
                "workType" : "mid",
                "workQuantity" : 150
            },
            {
                "workType" : "rack",
                "workQuantity" : 320
            }
        ]
    }
]


const SummaryData2 = [
    {
        "summaryType" : "real",
        "delayCount" : 450,
        "infos" : [
            {
                "workType" : "big",
                "workQuantity" : 530
            },
            {
                "workType" : "mid",
                "workQuantity" : 470
            },
            {
                "workType" : "rack",
                "workQuantity" : 200
            }
        ]
    },
    {
        "summaryType" : "simulation",
        "delayCount" : 170,
        "infos" : [
            {
                "workType" : "big",
                "workQuantity" : 220
            },
            {
                "workType" : "mid",
                "workQuantity" : 150
            },
            {
                "workType" : "rack",
                "workQuantity" : 300
            }
        ]
    }
];

const SummaryData3 = [
    {
        "summaryType" : "real",
        "delayCount" : 530,
        "infos" : [
            {
                "workType" : "big",
                "workQuantity" : 500
            },
            {
                "workType" : "mid",
                "workQuantity" : 600
            },
            {
                "workType" : "rack",
                "workQuantity" : 550
            }
        ]
    },
    {
        "summaryType" : "simulation",
        "delayCount" : 270,
        "infos" : [
            {
                "workType" : "big",
                "workQuantity" : 270
            },
            {
                "workType" : "mid",
                "workQuantity" : 200
            },
            {
                "workType" : "rack",
                "workQuantity" : 350
            }
        ]
    }
];

app.get("/simulation/history/summary", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(SummaryData));
});


app.get("/simulation/history/2458/summary", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(SummaryData1));
});

app.get("/simulation/history/3530/summary", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(SummaryData2));
});

app.get("/simulation/history/4540/summary", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(SummaryData3));
});

const simReal4540 = [
  {
    "workType" : "Setbox(M)",
    "infos": [
        {
            "time": "2020-05-01:05:00",
            "value": 75.6073
        },
        {
            "time": "2020-05-01:10:00",
            "value": 78.9077
        },
        {
            "time": "2020-05-01:15:00",
            "value": 77.6073
        },
        {
            "time": "2020-05-01:20:00",
            "value": 81.9077
        },
        {
            "time": "2020-05-01:25:00",
            "value": 75.6073
        },
        {
            "time": "2020-05-01:30:00",
            "value": 87.9077
        },
        {
            "time": "2020-05-01:35:00",
            "value": 77.6073
        },
        {
            "time": "2020-05-01:40:00",
            "value": 83.9077
        }
    ],
  },
  {
    "workType" : "Setbox(B)",
    "infos": [
      {
          "time": "2020-05-01:05:00",
          "value": 75.6073
      },
      {
          "time": "2020-05-01:10:00",
          "value": 85.9077
      },
      {
          "time": "2020-05-01:15:00",
          "value": 77.6073
      },
      {
          "time": "2020-05-01:20:00",
          "value": 81.9077
      },
      {
          "time": "2020-05-01:25:00",
          "value": 75.6073
      },
      {
          "time": "2020-05-01:30:00",
          "value": 87.9077
      },
      {
          "time": "2020-05-01:35:00",
          "value": 77.6073
      },
      {
          "time": "2020-05-01:40:00",
          "value": 83.9077
      }
    ],
  },
  {
    "workType": "SetboxRack",
    "infos": [
      {
          "time": "2020-05-01:05:00",
          "value": 75.6073
      },
      {
          "time": "2020-05-01:10:00",
          "value": 85.9077
      },
      {
          "time": "2020-05-01:15:00",
          "value": 77.6073
      },
      {
          "time": "2020-05-01:20:00",
          "value": 81.9077
      },
      {
          "time": "2020-05-01:25:00",
          "value": 75.6073
      },
      {
          "time": "2020-05-01:30:00",
          "value": 87.9077
      },
      {
          "time": "2020-05-01:35:00",
          "value": 77.6073
      },
      {
          "time": "2020-05-01:40:00",
          "value": 83.9077
      }
    ],
  }
]

const simResult4540 = [
  {
    "workType" : "Setbox(M)",
    "infos": [
        {
            "time": "2020-05-01:05:00",
            "value": 95.6073
        },
        {
            "time": "2020-05-01:10:00",
            "value": 75.9077
        },
        {
            "time": "2020-05-01:15:00",
            "value": 79.6073
        },
        {
            "time": "2020-05-01:20:00",
            "value": 51.9077
        },
        {
            "time": "2020-05-01:25:00",
            "value": 55.6073
        },
        {
            "time": "2020-05-01:30:00",
            "value": 81.9077
        },
        {
            "time": "2020-05-01:35:00",
            "value": 87.6073
        },
        {
            "time": "2020-05-01:40:00",
            "value": 60.9077
        }
    ],
  },
  {
    "workType" : "Setbox(B)",
    "infos": [
      {
          "time": "2020-05-01:05:00",
          "value": 95.6073
      },
      {
          "time": "2020-05-01:10:00",
          "value": 75.9077
      },
      {
          "time": "2020-05-01:15:00",
          "value": 79.6073
      },
      {
          "time": "2020-05-01:20:00",
          "value": 51.9077
      },
      {
          "time": "2020-05-01:25:00",
          "value": 55.6073
      },
      {
          "time": "2020-05-01:30:00",
          "value": 81.9077
      },
      {
          "time": "2020-05-01:35:00",
          "value": 87.6073
      },
      {
          "time": "2020-05-01:40:00",
          "value": 60.9077
      }
    ],
  },
  {
    "workType": "SetboxRack",
    "infos": [
      {
          "time": "2020-05-01:05:00",
          "value": 95.6073
      },
      {
          "time": "2020-05-01:10:00",
          "value": 75.9077
      },
      {
          "time": "2020-05-01:15:00",
          "value": 79.6073
      },
      {
          "time": "2020-05-01:20:00",
          "value": 51.9077
      },
      {
          "time": "2020-05-01:25:00",
          "value": 55.6073
      },
      {
          "time": "2020-05-01:30:00",
          "value": 81.9077
      },
      {
          "time": "2020-05-01:35:00",
          "value": 87.6073
      },
      {
          "time": "2020-05-01:40:00",
          "value": 60.9077
      }
    ],
  }
]

app.get("/simulation/history/4540/comparison/real", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(simReal4540));
});

app.get("/simulation/history/4540/comparison/results", function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(simResult4540));
});

const simReal2458 = [
    {
      "workType" : "Setbox(M)",
      "infos": [
          {
              "time": "2020-05-01:05:00",
              "value": 75.6073
          },
          {
              "time": "2020-05-01:10:00",
              "value": 78.9077
          },
          {
              "time": "2020-05-01:15:00",
              "value": 77.6073
          },
          {
              "time": "2020-05-01:20:00",
              "value": 81.9077
          },
          {
              "time": "2020-05-01:25:00",
              "value": 75.6073
          },
          {
              "time": "2020-05-01:30:00",
              "value": 87.9077
          },
          {
              "time": "2020-05-01:35:00",
              "value": 77.6073
          },
          {
              "time": "2020-05-01:40:00",
              "value": 83.9077
          }
      ],
    },
    {
      "workType" : "Setbox(B)",
      "infos": [
        {
            "time": "2020-05-01:05:00",
            "value": 75.6073
        },
        {
            "time": "2020-05-01:10:00",
            "value": 85.9077
        },
        {
            "time": "2020-05-01:15:00",
            "value": 77.6073
        },
        {
            "time": "2020-05-01:20:00",
            "value": 81.9077
        },
        {
            "time": "2020-05-01:25:00",
            "value": 75.6073
        },
        {
            "time": "2020-05-01:30:00",
            "value": 87.9077
        },
        {
            "time": "2020-05-01:35:00",
            "value": 77.6073
        },
        {
            "time": "2020-05-01:40:00",
            "value": 83.9077
        }
      ],
    },
    {
      "workType": "SetboxRack",
      "infos": [
        {
            "time": "2020-05-01:05:00",
            "value": 75.6073
        },
        {
            "time": "2020-05-01:10:00",
            "value": 85.9077
        },
        {
            "time": "2020-05-01:15:00",
            "value": 77.6073
        },
        {
            "time": "2020-05-01:20:00",
            "value": 81.9077
        },
        {
            "time": "2020-05-01:25:00",
            "value": 75.6073
        },
        {
            "time": "2020-05-01:30:00",
            "value": 87.9077
        },
        {
            "time": "2020-05-01:35:00",
            "value": 77.6073
        },
        {
            "time": "2020-05-01:40:00",
            "value": 83.9077
        }
      ],
    }
  ]
  

const simResult2458 = [
    {
      "workType" : "Setbox(M)",
      "infos": [
          {
              "time": "2020-05-01:05:00",
              "value": 95.6073
          },
          {
              "time": "2020-05-01:10:00",
              "value": 75.9077
          },
          {
              "time": "2020-05-01:15:00",
              "value": 79.6073
          },
          {
              "time": "2020-05-01:20:00",
              "value": 51.9077
          },
          {
              "time": "2020-05-01:25:00",
              "value": 55.6073
          },
          {
              "time": "2020-05-01:30:00",
              "value": 81.9077
          },
          {
              "time": "2020-05-01:35:00",
              "value": 87.6073
          },
          {
              "time": "2020-05-01:40:00",
              "value": 60.9077
          }
      ],
    },
    {
      "workType" : "Setbox(B)",
      "infos": [
        {
            "time": "2020-05-01:05:00",
            "value": 95.6073
        },
        {
            "time": "2020-05-01:10:00",
            "value": 75.9077
        },
        {
            "time": "2020-05-01:15:00",
            "value": 79.6073
        },
        {
            "time": "2020-05-01:20:00",
            "value": 51.9077
        },
        {
            "time": "2020-05-01:25:00",
            "value": 55.6073
        },
        {
            "time": "2020-05-01:30:00",
            "value": 81.9077
        },
        {
            "time": "2020-05-01:35:00",
            "value": 87.6073
        },
        {
            "time": "2020-05-01:40:00",
            "value": 60.9077
        }
      ],
    },
    {
      "workType": "SetboxRack",
      "infos": [
        {
            "time": "2020-05-01:05:00",
            "value": 95.6073
        },
        {
            "time": "2020-05-01:10:00",
            "value": 75.9077
        },
        {
            "time": "2020-05-01:15:00",
            "value": 79.6073
        },
        {
            "time": "2020-05-01:20:00",
            "value": 51.9077
        },
        {
            "time": "2020-05-01:25:00",
            "value": 55.6073
        },
        {
            "time": "2020-05-01:30:00",
            "value": 81.9077
        },
        {
            "time": "2020-05-01:35:00",
            "value": 87.6073
        },
        {
            "time": "2020-05-01:40:00",
            "value": 60.9077
        }
      ],
    }
  ]
  
  app.get("/simulation/history/2458/comparison/real", function (req, res) {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
      res.setHeader("Content-Type", "application/json")
      res.send(JSON.stringify(simReal2458));
  });
  
  app.get("/simulation/history/2458/comparison/results", function (req, res) {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:9999");
      res.setHeader("Content-Type", "application/json")
      res.send(JSON.stringify(simResult2458));
  });

