const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const { generateToken } = require("../utils/generateToken")

/**
 * @description Registers a user and saves data into the database
 */
exports.register = asyncHandler(async (req, res) => {
	const { first_name, last_name, email, password, role } = req.body

	if (!first_name || !last_name || !email || !password) {
		return res.status(400).json({ msg: "Please fill all fields" })
	}

	// check if user has registered already
	const existingUser = await User.findOne({ email })

	if (existingUser) {
		return res.status(400).json({ msg: "User registered already" })
	}

	if (password.length < 6) {
		throw new Error("Please your password must be at least 6 characters")
	}

	// hash user password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	//create user and save into the database
	const user = await User.create({
		first_name,
		last_name,
		role,
		email,
		password: hashedPassword,
	})

	if (user) {
		user.password = undefined
		res.status(201).json({
			message: "Registration completed. Please you may login",
			user,
		})
	} else {
		return res.status(400).json({
			Error: "User registration failed",
		})
	}
})

/**
 * @description Login user
 */
exports.login = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	// check if user is registered
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error("Invalid user credentials")
	}

	const match = await bcrypt.compare(password, user.password)

	if (match) {
		user.password = undefined

		const token = generateToken(user._id, user.email)
		//tokens in the cookie
		res.cookie("token", token, {
			httpOnly: true, // only accessed on the server
			secure: true,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})

		res.status(200).json({
			message: `Welcome back ${user?.first_name}`,
			user,
		})
	} else {
		return res.status(400).json({
			Error: "Invalid login details",
		})
	}
})

/**
 * @description Logout user
 */
exports.logout = asyncHandler(async (req, res) => {
	try {
		res.clearCookie("token", {
			httpOnly: true,
			secure: true,
		})

		return res.status(200).json({ message: " Log out completed" })
	} catch (error) {
		throw new Error("Error: " + error.message)
	}
})

/**
 * @description Fetches user data from the database
 */
exports.getUsers = asyncHandler(async (req, res) => {
	//res.json({ data: req.user })
	const users = await User.find()

	res.status(200).json({ data: users })
})

exports.getUser = asyncHandler(async (req, res) => {
	const { userId } = req.params

	try {
		const user = await Post.findById(userId)
		res.status(200).json({ data: user })
	} catch (error) {
		throw new Error("error")
	}
})
