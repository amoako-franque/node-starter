const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Declare the Schema of the Mongo model
const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		numViews: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
)

//Export the model
const Post = mongoose.model("Post", postSchema)
module.exports = Post
