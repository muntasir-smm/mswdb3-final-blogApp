// server/routes/posts.js

import express from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllPosts,
  likePost,
  unlikePost,
} from "../controllers/posts.js";
import { protect } from "../middleware/auth.js";
import upload from "../utils/upload.js";

const router = express.Router();

router
  .route("/")
  .get(getAllPosts)
  .post(protect, upload.single("coverImage"), createPost);

router
  .route("/:id")
  .get(getPost)
  .patch(protect, upload.single("coverImage"), updatePost)
  .delete(protect, deletePost);

router.patch("/:id/like", protect, likePost);
router.patch("/:id/unlike", protect, unlikePost);

export default router;
