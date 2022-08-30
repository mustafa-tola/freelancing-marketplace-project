const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    buyerId: { type: String, required: true },
    sellerId: { type: String, required: true },
    projectId: {type: String, required: true}
}, { collection: "request" }) //creating a schema for the orders collection

const requestModel = mongoose.model('requestSchema', requestSchema) //creating a model for the orders schema

module.exports = requestModel 