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
    file: {type: String}
}, { collection: "orders" }) //creating a schema for the orders collection

const orderModel = mongoose.model('orderSchema', orderSchema) //creating a model for the orders schema

module.exports = { orderSchema, orderModel }

// // _id
// :62fbd94f2d9d6145fd58ea8d
// title
// :"Make an ecommerce website"
// description
// :"Develop an ecommerce website like amazon.com"
// category
// :"Ecommerce Website Development"
// price
// :1000
// duration
// :"3 months"
// status
// :"Completed"
// buyerId
// :"62f75660ce79c34f3b38bc13"
// sellerId
// :"62fbac8e008fc020e3fe4af5"

