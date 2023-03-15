const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secret = process.env.API_SECRET_KEY;

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

module.exports = { login, register };
