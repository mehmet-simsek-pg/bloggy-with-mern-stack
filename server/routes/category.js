const express = require("express");
const router = express.Router();

const { getCategory, creatCategory } = require("../controllers/category");
const { apiLimiter } = require("../middlewares/limiter");

router.route("/").get(apiLimiter, getCategory).post(apiLimiter, creatCategory);

module.exports = router;
