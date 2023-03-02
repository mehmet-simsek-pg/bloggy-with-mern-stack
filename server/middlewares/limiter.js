const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requested from this IP",
});
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

module.exports = { createAccountLimiter, apiLimiter };
