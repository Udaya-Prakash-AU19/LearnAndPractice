const express = require("express");
const { verifyRefreshToken } = require("../Controllers/RefreshController.js");

const router = express.Router();

router.get('/refresh/token', verifyRefreshToken);

module.exports = router;
