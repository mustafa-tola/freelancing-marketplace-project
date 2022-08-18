const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
}, { collection: "categories" }) //creating a schema for the orders collection

const categoryModel = mongoose.model('categorySchema', categorySchema) //creating a model for the orders schema

module.exports = categoryModel 