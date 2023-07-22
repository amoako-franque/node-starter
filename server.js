const express = require("express")
require("dotenv").config()
const cors = require("cors")
const fs = require("fs")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const dbConnection = require("./config/db")
const { notFound, errorHandler } = require("./middlewares/errorHandler")

const app = express()

// mongodb connection
dbConnection()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(cookieParser())

const port = process.env.PORT || 5000

fs.readdirSync("./routes").map((route) =>
	app.use("/", require("./routes/" + route))
)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
	console.info(`Server listen on port http://localhost:${port}`)
})
