const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    buyerId: { type: String, required: true },
}, { collection: "projects" }) //creating a schema for the orders collection

const projectModel = mongoose.model('projectSchema', projectSchema) //creating a model for the orders schema

module.exports = projectModel 