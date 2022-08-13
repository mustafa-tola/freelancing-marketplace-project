
const buyerModel = require("../model/buyer");

const addingBuyer = (req,res) => { //creating a post endpoint on /api/register and defining the method for it
    if(!req.body.name || !req.body.email || !req.body.phone) {
        return res.status(400).send({
            message: "All of the properties of the buyer object should be filled"
        });
    } //checking if all the required fields are filled or not if not passing an error message
    const buyer = new buyerModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address || "Not mentioned"
    }) //creating a new buyer object
    buyer.save()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the buyer account"
        })
    }) //saving the new buyer object in the database
}

const retrieveAllBuyers = (req,res) => {
    buyerModel.find()
    .then((buyers) => res.send(buyers))
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving the buyers"
        })
    })
}

const retrieveBuyer = (req,res) => {
    buyerModel.find({email: req.params.email})
    .then(buyer => {
        if(!buyer) {
            return res.status(404).send({
                message: "Buyer not found with email " + req.params.email
            })
        }
        res.send(buyer)
    })
    .catch(err => {
        if(err.kind == "ObjectId") {
            return res.status(404).send({
                message: "Buyer not found with email " + req.params.email
            })
        }
        return res.status(500).send({
            message: "Error retrieving buyer with email " + req.params.email
        })
    })
}

module.exports = {
    addingBuyer,
    retrieveAllBuyers,
    retrieveBuyer
}