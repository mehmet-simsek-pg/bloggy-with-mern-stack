require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRouter = require("./routes/post");
const upload = require("./middlewares/uploadImage");

const connectDB = require("./db/connect");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRouter);
app.post("/upload", upload, (req, res) => {
  res.status(200).json("Image has been uploaded");
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
