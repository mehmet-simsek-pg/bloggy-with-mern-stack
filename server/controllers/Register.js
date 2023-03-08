const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const secret = "PTx63GadL_-qoohS9ar9JStiPkMS6ZU4cdaPMsm6DrQ";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Wrong credentials" });
  }

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // Create a new user
    const token = jwt.sign({ username, email }, secret);
    await User.create({
      username,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, salt),
      token,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register };
