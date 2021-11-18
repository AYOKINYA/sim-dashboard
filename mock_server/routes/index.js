const express = require('express');
const router = express.Router();

const constants = require('../constants');
const cors = require('cors');

const corsOptions = {
                origin: constants.CLIENT_ADDR,
                methods: ["GET", "POST"]
}

router.use(cors(corsOptions));

const dashboard = require('./dashboard')
const simulation = require('./simulation')

router.use('/dashboard', dashboard);
router.use('/simulation', simulation);

module.exports = router;