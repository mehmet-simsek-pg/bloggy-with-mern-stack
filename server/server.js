require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const postRouter = require("./routes/posts");
const profileRouter = require("./routes/profile");

const connectDB = require("./db/connect");
const verifyToken = require("./middlewares/verifyToken");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/post", postRouter);
app.use("/profile", profileRouter);

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
