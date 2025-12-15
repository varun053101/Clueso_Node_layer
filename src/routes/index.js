const express = require('express');

const v1Routes = require('./v1');
const router = express.Router();

router.use('/v1', v1Routes);
// Note: recording routes are registered directly in index.js
// before global body parsers to prevent binary data corruption
router.use("/sessions", require("./v1/sessionRoutes"));

module.exports = router;