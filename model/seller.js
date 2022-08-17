const mongoose = require("mongoose")
const { orderSchema } = require("./order")

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    address: { type: String },
    service: { type: String, required: true },
    orders: { type: [orderSchema] },
    rating: {type: Number}
}, { collection: "sellers" }) //creating a schema for the buyers collection

const sellerModel = mongoose.model('sellerSchema', sellerSchema) //creating a model for the buyers schema

module.exports = sellerModel