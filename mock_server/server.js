
const express = require("express");
const app = express();
const port = 4000;
const cors = require('cors');

const server = app.listen(`${port}`, function() {
    console.log(`Server started on port ${port}`);
  });

const corsOptions = {
                origin: "http://localhost:9999",
                methods: ["GET", "POST"]
            }

app.use(cors(corsOptions));

const routes = require('./routes') //router 안에서도 cors 사용해야 한다.

app.use(routes);
