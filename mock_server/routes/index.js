const express = require('express');
const router = express.Router();

const cors = require('cors');

const corsOptions = {
                origin: "http://localhost:9999",
                methods: ["GET", "POST"]
            }

router.use(cors(corsOptions));

const dashboard = require('./dashboard')
const simulation = require('./simulation')

router.use('/dashboard', dashboard);
router.use('/', simulation);

module.exports = router;