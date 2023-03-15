const express = require("express");
const router = express.Router();

const { apiLimiter } = require("../middlewares/limiter");
const { getUser, updateUser, deleteUser } = require("../controllers/user");

router
  .route("/:id")
  .get(apiLimiter, getUser)
  .put(apiLimiter, updateUser)
  .delete(apiLimiter, deleteUser);

module.exports = router;
