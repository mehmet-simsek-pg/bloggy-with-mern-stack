const express = require("express");
const router = express.Router();

const { apiLimiter, createAccountLimiter } = require("../middlewares/limiter");
const { login, register } = require("../controllers/auth");

router.post("/login", apiLimiter, login);
router.post("/register", createAccountLimiter, register);

module.exports = router;
