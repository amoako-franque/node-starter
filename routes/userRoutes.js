const express = require("express")
const {
	register,
	login,
	getUsers,
	logout,
} = require("../controllers/userController")
const { requireSignIn, isAdmin } = require("../middlewares/authMidleware")
const userRouter = express.Router()

userRouter.post("/signup", register)
userRouter.post("/login", login)
userRouter.post("/logout", logout)
userRouter.get("/users", getUsers)
userRouter.get("/users/:userId", requireSignIn, isAdmin, getUsers)

module.exports = userRouter
