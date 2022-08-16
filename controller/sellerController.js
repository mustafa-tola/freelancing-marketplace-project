const sellerModel = require("../model/seller");

const addingSeller = (req,res) => { //creating a post endpoint on /api/register and defining the method for it
    if(!req.body.name || !req.body.email || !req.body.phone || !req.body.service) {
        return res.status(400).send({
            message: "All of the properties of the buyer object should be filled"
        });
    } //checking if all the required fields are filled or not if not passing an error message
    const seller = new sellerModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address || "Not mentioned",
        service: req.body.service,
        completedOrders: [],
        rating: 0
    }) //creating a new buyer object
    seller.save()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the buyer account"
        })
    }) //saving the new buyer object in the database
}

const retrieveAllSellers = (req,res) => {
    sellerModel.find()
    .then((sellers) => res.send(sellers))
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving the buyers"
        })
    })
}

const retrieveSeller = (req,res) => {
    sellerModel.find({email: req.params.email})
    .then(seller => {
        if(!seller) {
            return res.status(404).send({
                message: "Buyer not found with email " + req.params.email
            })
        }
        res.send(seller)
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
    addingSeller,
    retrieveAllSellers,
    retrieveSeller
}