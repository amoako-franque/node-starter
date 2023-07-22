const express = require("express")
const { requireSignIn, isAdmin } = require("../middlewares/authMidleware")
const {
	createPost,
	fetchPosts,
	fetchPost,
	deletePost,
} = require("../controllers/postController")
const postRouter = express.Router()

postRouter.post("/create-post", requireSignIn, createPost)
postRouter.get("/posts", fetchPosts)
postRouter.get("/posts/:postId", fetchPost)
postRouter.delete("/posts/:postId", requireSignIn, deletePost)

module.exports = postRouter
