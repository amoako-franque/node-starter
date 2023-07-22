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
	res.status(200).json({ data: posts })
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
	const { _id } = req?.user
	const post = await Post.findOne({ _id: postId })

	// will continue from here and explain on our next session

	// res.send({ _id, user: post.user })
	// return
	// validateMongoId(postId)
	// try {
	// 	const post = await Post.findOne(postId)
	// if (user._id === post.user) {
	// 	if (post === null || post.length === 0) {
	// 		return res.status(200).json({ message: "No post found" })
	// 	}
	// 	res.status(200).json({ data: post })
	// }
	// } catch (error) {
	// 	throw new Error("error", error)
	// }
})
