const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
} = require("../controllers/posts");

router.route("/").get(getPosts).post(createPost).put(updatePost);
router.route("/:id").get(getPost);

module.exports = router;
