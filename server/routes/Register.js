const express = require("express");
const router = express.Router();

const { register } = require("../controllers/Register");
const { createAccountLimiter } = require("../middlewares/limiter");

router.route("/").post(createAccountLimiter, register);

module.exports = router;
