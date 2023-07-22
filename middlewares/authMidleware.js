const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

exports.requireSignIn = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization

	if (!authHeader?.startsWith("Bearer ")) {
		throw new Error("Unauthorized. Please login to continue")
	}

	try {
		const token = authHeader?.split(" ")[1]
		jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
			if (err) {
				return res.json({ message: "Invalid Token" })
			}
			const userId = data?.userId

			const user = await User.findById(userId).select("-password")

			req.user = user

			next()
		})
	} catch (error) {
		throw new Error(
			"Not Authorized or token has expired. Login or contact the admin"
		)
	}
})

exports.isAdmin = asyncHandler(async (req, res, next) => {
	const user = req.user

	if (user.role === "User") {
		throw new Error("You are not an admin. Contact the Administrator")
	}
	next()
})
