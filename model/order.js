const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    status: { type: String, required: true },
    buyerId: { type: String, required: true },
    sellerId: { type: String, required: true },
}, { collection: "orders" }) //creating a schema for the orders collection

const orderModel = mongoose.model('orderSchema', orderSchema) //creating a model for the orders schema

module.exports = { orderSchema, orderModel }