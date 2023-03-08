const express = require("express");
const router = express.Router();

const profile = require("../controllers/Profile");
const { apiLimiter } = require("../middlewares/limiter");
const verifyToken = require("../middlewares/verifyToken");

router.route("/").get(apiLimiter, verifyToken, profile);

module.exports = router;
