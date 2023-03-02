const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createAccountLimiter = require("../middlewares/limiter");

const salt = bcrypt.genSaltSync(10);
const secret = "PTx63GadL_-qoohS9ar9JStiPkMS6ZU4cdaPMsm6DrQ";

const register =
  (createAccountLimiter,
  async (req, res) => {
    const { username, email, password } = req.body;
    const token = jwt.sign({ email, username }, secret);
    try {
      const userDoc = await User.create({
        username,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, salt),
        token,
      });

      res.json({ success: true, user: userDoc });

    } catch (e) {
      res.status(400).json(e);
    }
  });

module.exports = { register };
