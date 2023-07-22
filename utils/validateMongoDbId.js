const mongoose = require("mongoose")

const validateMongoId = (id) => {
	const isValid = mongoose.Types.ObjectId.isValid(id) // boolean
	if (!isValid) throw new Error(`This id ${id} is not Valid `)
}

module.exports = validateMongoId
