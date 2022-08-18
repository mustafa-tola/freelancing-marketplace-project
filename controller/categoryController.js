const categoryModel = require("../model/category");

const addingCategory = (req,res) => { //creating a post endpoint on /registerCategory and defining the method for it
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.duration) {
        return res.status(400).send({
            message: "All of the properties of the category object should be filled"
        });
    } //checking if all the required fields are filled or not if not passing an error message
    const category = new categoryModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        duration: req.body.duration,
    }) //creating a new category object
    category.save()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the category"
        })
    }) //saving the new category object in the database
}

const retrieveAllCategories = (req,res) => {
    categoryModel.find()
    .then((categories) => res.send(categories))
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving the categories"
        })
    })
}

const retrieveCategory = (req,res) => {
    categoryModel.find({name: req.params.name})
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with name " + req.params.name
            })
        }
        res.send(category)
    })
    .catch(err => {
        if(err.kind == "ObjectId") {
            return res.status(404).send({
                message: "Category not found with name " + req.params.name
            })
        }
        return res.status(500).send({
            message: "Error retrieving category with name " + req.params.name
        })
    })
}

module.exports = {
    addingCategory,
    retrieveAllCategories,
    retrieveCategory
}