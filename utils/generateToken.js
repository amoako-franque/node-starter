const jwt = require("jsonwebtoken")
const crypto = require("crypto")

/**
 *
 * @param {user._id} userId
 * @param {user.email} email
 * @returns JWT token
 */
exports.generateToken = (userId, email) => {
	return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	})
}
