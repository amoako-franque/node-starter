const express = require("express")
const cacheService = require("express-api-cache")
const { requireSignIn, isAdmin } = require("../middlewares/authMidleware")
const {
	createPost,
	fetchPosts,
	fetchPost,
	deletePost,
} = require("../controllers/postController")
const cache = cacheService.cache
const postRouter = express.Router()

postRouter.post("/create-post", requireSignIn, createPost)
postRouter.get("/posts", cache("10 minutes"), fetchPosts)
postRouter.get("/posts/:postId", fetchPost)
postRouter.delete("/posts/:postId", requireSignIn, deletePost)

module.exports = postRouter
