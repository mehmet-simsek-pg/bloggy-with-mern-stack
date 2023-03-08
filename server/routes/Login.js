const express = require("express");
const router = express.Router();

const login = require("../controllers/Login");
const { apiLimiter } = require("../middlewares/limiter");

router.route("/").post(apiLimiter, login);

module.exports = router;
