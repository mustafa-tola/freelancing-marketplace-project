const requestModel = require("../model/request");
const sellerModel = require("../model/seller")

const addingOrderRequest = (req, res) => { //creating a post endpoint on /api/registerOrderRequest and defining the method for it
    if (!req.body.title || !req.body.description || !req.body.category || !req.body.price || !req.body.duration || !req.body.buyerId || !req.body.sellerId || !req.body.projectId) {
        return res.status(400).send({
            message: "All of the properties of the project object should be filled"
        });
    } //checking if all the required fields are filled or not if not passing an error message
    const request = new requestModel({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        duration: req.body.duration,
        buyerId: req.body.buyerId,
        sellerId: req.body.sellerId,
        projectId: req.body.projectId
    }) //creating a new request object
    request.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the order"
            })
        }) //saving the new order request object in the database
}

const retrieveOrderRequestsOfASeller = (req, res) => {
    sellerModel.find({ email: req.params.email },"_id")
        .then(id => {
            if (!id) {
                return res.status(404).send({
                    message: "Seller not found with email " + req.params.email
                })
            }
            ids = []
            id.map(obj => ids.push(obj["_id"].toString()))
            requestModel.find({sellerId: {$in: ids}})
                .then((orders) => {
                    res.send("Order Requests "+orders)
                })
                .catch((err) => {
                    res.send(err.message)
                })
        })
        .catch(err => {
            if (err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "Order Requests not found with email " + req.params.email
                    // message: err.message
                })
            }
            return res.status(500).send({
                message: "Error retrieving order requests with email " + req.params.email
                // message: err.message
            })
        })
}

const retrieveOrderRequest = (req, res) => {
    requestModel.findById(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order Requests not found with id " + req.params.id
                })
            }
            res.send(order)
        })
        .catch(err => {
            if (err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "Order Request not found with id " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error retrieving order request with id " + req.params.id
            })
        })
}

module.exports = {
    addingOrderRequest,
    retrieveOrderRequest,
    retrieveOrderRequestsOfASeller,
}