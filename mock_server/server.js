
const express = require("express");
const app = express();
const constants = require('./constants');
const cors = require('cors');

const logger = require('./logger')


const server = app.listen(`${constants.SERVER_PORT_NO}`, function() {
    logger.info(`Server started on port ${constants.SERVER_PORT_NO}`);
    logger.info(`Client Addr - ${constants.CLIENT_ADDR}`);
});

const corsOptions = {
                origin: constants.CLIENT_ADDR,
                methods: ["GET", "POST"]
}

app.use(cors(corsOptions));

const routes = require('./routes') //router 안에서도 cors 사용해야 한다.

app.use(routes);
