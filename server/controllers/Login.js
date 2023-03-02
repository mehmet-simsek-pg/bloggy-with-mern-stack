const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const apiLimiter = require("../middlewares/limiter");

const secret = "PTx63GadL_-qoohS9ar9JStiPkMS6ZU4cdaPMsm6DrQ";

const login =
  (apiLimiter,
  async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      res.status(400).json("wrong credentials");
    }
    username = userDoc.username;

    const token = jwt.sign({ email, username }, secret);
    const filter = { email };
    const update = { $set: { token } };

    let user = await User.findOneAndUpdate(filter, update, { new: true });

    res.status(200).json({ token });
  });

module.exports = login;
