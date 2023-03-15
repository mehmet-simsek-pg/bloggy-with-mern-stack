const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const { apiLimiter } = require("../middlewares/limiter");

router.route("/").get(apiLimiter, getAllPosts).post(apiLimiter, createPost);
router
  .route("/:id")
  .get(apiLimiter, getPost)
  .put(apiLimiter, updatePost)
  .delete(apiLimiter, deletePost);

module.exports = router;
