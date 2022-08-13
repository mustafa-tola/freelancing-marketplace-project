const mongoose = require("mongoose")

const buyerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {type: Number, required: true},
    address: {type: String}
},{collection: "buyers"}) //creating a schema for the buyers collection

const buyerModel = mongoose.model('buyerSchema',buyerSchema) //creating a model for the buyers schema

module.exports = buyerModel