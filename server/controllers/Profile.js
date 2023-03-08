const jwt = require("jsonwebtoken");
const apiLimiter = require("../middlewares/limiter");
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/UserModel");

const secret = "PTx63GadL_-qoohS9ar9JStiPkMS6ZU4cdaPMsm6DrQ";

const profile = async (req, res) => {
  res.status(200).json("Hello JWT");
};

module.exports = profile;
