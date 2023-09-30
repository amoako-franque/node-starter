const express = require("express")
const {
	register,
	login,
	getUsers,
	logout,
	deleteUser,
} = require("../controllers/userController")
const { requireSignIn, isAdmin } = require("../middlewares/authMidleware")
const userRouter = express.Router()

userRouter.post("/signup", register)
userRouter.post("/login", login)
userRouter.post("/logout", logout)
userRouter.get("/users", getUsers)
userRouter.get("/users/:userId", requireSignIn, isAdmin, getUsers)
userRouter.delete("/users/:userId", requireSignIn, deleteUser)

module.exports = userRouter
