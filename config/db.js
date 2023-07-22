const mongoose = require("mongoose")

/**
 * @description Connects to mongodb database
 */
const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log("MongoDb is Connected successfully ...")
	} catch (error) {
		console.error(`Error connecting to MongoDb Database:: ${error.message}`)
		process.exit(1)
	}
}

module.exports = dbConnection
