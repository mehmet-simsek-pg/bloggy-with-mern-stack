const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const apiLimiter = require("../middlewares/limiter");

const secret = "PTx63GadL_-qoohS9ar9JStiPkMS6ZU4cdaPMsm6DrQ";

const login = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (email !== userDoc.email && !passOk) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  username = userDoc.username;

  const token = jwt.sign({ email, username }, secret);
  res.header("token", token);
  const filter = { email };
  const update = { $set: { token } };

  await User.findOneAndUpdate(filter, update, { new: true });

  res.status(200).json({ token });
};

module.exports = login;
