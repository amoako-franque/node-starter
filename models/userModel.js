const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Declare the Schema of the Mongo model
const userSchema = new Schema(
	{
		first_name: {
			type: String,
			required: [true, "First name is required"],
			trim: true,
		},
		last_name: {
			type: String,
			required: [true, "Last name is required"],
			trim: true,
		},

		email: {
			type: String,
			required: [true, "Please provide a valid email"],
			unique: true,
			lowercase: true,
			trim: true,
			match: [
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				"Please enter a valid email address",
			],
		},
		password: {
			type: String,
			required: true,
		},
		profilePic: {
			type: String,
			default:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
		},
		bio: {
			type: String,
		},

		postCount: {
			type: Number,
			default: 0,
		},

		isBlocked: {
			type: Boolean,
			default: false,
		},

		isAdmin: {
			type: Boolean,
			default: false,
		},

		role: {
			type: String,
			enum: ["Admin", "User"],
			default: "User",
		},

		verified: {
			type: Boolean,
			default: false,
		},

		accountVerificationCode: {
			type: String,
		},
		accountVerificationCodeExpiry: {
			type: Date,
		},
		// secret: {
		// 	type: String,
		// 	required: true,
		// 	trim: true,
		// },
		viewedBy: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		},
		passwordResetToken: String,
		passwordResetTokenExpiry: Date,
		passwordChangedAt: Date,
	},
	{ timestamps: true }
)

//Export the model
const User = mongoose.model("User", userSchema)
module.exports = User
