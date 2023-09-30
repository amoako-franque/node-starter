const asyncHandler = require("express-async-handler")
const Post = require("../models/postModel")
const validateMongoId = require("../utils/validateMongoDbId")

/**
 * @description create post by user
 */
exports.createPost = asyncHandler(async (req, res) => {
	const { _id } = req.user
	const { title, content } = req.body

	const post = await Post.create({ title, content, user: _id })

	res.json({ data: post })
})

//fetch all posts
exports.fetchPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find()
	res.status(200).json({ data: posts, postCount: posts.length })
})

// fetch single post
exports.fetchPost = asyncHandler(async (req, res) => {
	const { postId } = req.params

	validateMongoId(postId)

	try {
		//const post = await Post.findById(id)

		const post = await Post.findByIdAndUpdate(
			postId,
			{
				$inc: { numViews: 1 },
			},
			{ new: true }
		)
		res.status(200).json({ data: post })
	} catch (error) {
		throw new Error("error")
	}
})

/**
 * @description user deletes post/s
 */
exports.deletePost = asyncHandler(async (req, res) => {
	const { postId } = req.params

	const user = req?.user
	// const post = await Post.findOne({ _id: postId })

	// res.json({ postID: post.user.toString(), user: user._id.toString() })

	try {
		const post = await Post.findOne({ _id: postId })
		if (post === null || post.length === 0) {
			return res.status(200).json({ message: "No post found" })
		}

		if (user._id.toString() === post.user.toString()) {
			await Post.findOneAndDelete({ _id: postId })

			res.status(200).json({ msg: "Post deleted" })
		} else {
			res.status(401).json({ msg: "Please login to continue" })
		}
	} catch (error) {
		throw new Error("error", error)
	}
})
