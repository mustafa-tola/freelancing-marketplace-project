const orderFunc = require("../model/order");
const sellerModel = require("../model/seller")

const addingOrder = (req, res) => { //creating a post endpoint on /api/registerOrder and defining the method for it
    if (!req.body.title || !req.body.description || !req.body.category || !req.body.price || !req.body.duration || !req.body.buyerId || !req.body.sellerId) {
        return res.status(400).send({
            message: "All of the properties of the order object should be filled"
        });
    } //checking if all the required fields are filled or not if not passing an error message
    const order = new orderFunc.orderModel({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        duration: req.body.duration,
        status: "Ongoing",
        buyerId: req.body.buyerId,
        sellerId: req.body.sellerId,
        file: ""
    }) //creating a new order object
    order.save()
        .then(data => {
            sellerModel.findByIdAndUpdate(req.body.sellerId, { $push: { orders: order._id } }, (err, data) => {
                if (err) {
                    console.log(err.message)
                }
                else {
                    res.send(data)
                }
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the order"
            })
        }) //saving the new order object in the database
}

const retrieveOrdersOfASeller = (req, res) => {
    sellerModel.find({ email: req.params.email }, "orders")
        .then(id => {
            if (!id) {
                return res.status(404).send({
                    message: "Orders not found with email " + req.params.email
                })
            }
            ids = []
            id.map(obj => ids.push(obj["orders"]))
            console.log(ids)
            orderFunc.orderModel.find({ _id: { $in: ids } })
                .then((orders) => {
                    res.send("Orders " + orders)
                })
                .catch((err) => {
                    console.log(err.message)
                })
        })
        .catch(err => {
            if (err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "Order not found with email " + req.params.email
                    // message: err.message
                })
            }
            return res.status(500).send({
                message: "Error retrieving orders with email " + req.params.email
                // message: err.message
            })
        })
}

const retrieveOrder = (req, res) => {
    orderFunc.orderModel.findById(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                })
            }
            res.send(order)
        })
        .catch(err => {
            if (err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error retrieving order with id " + req.params.id
            })
        })
}

const updateOrderStatus = (req, res) => {
    orderFunc.orderModel.findByIdAndUpdate(req.params.orderId, { status: req.body.status })
        .then((order) => {
            //    res.send(order["sellerId"])
            sellerModel.findByIdAndUpdate(order["sellerId"], { rating: req.body.rating })
                .then(seller => {
                    res.send(seller)
                })
                .catch((err) => {
                    res.send("Error: "+err.message)
                })
        })
        .catch((err) => {
            if (err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error retrieving order with id " + req.params.id
            })
        })
}

module.exports = {
    addingOrder,
    retrieveOrder,
    retrieveOrdersOfASeller,
    updateOrderStatus
}