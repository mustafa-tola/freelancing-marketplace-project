const projectModel = require("../model/project");

const addingProject = (req,res) => { //creating a post endpoint on /registerProject and defining the method for it
    if (!req.body.title || !req.body.description || !req.body.category || !req.body.price || !req.body.duration ||  !req.body.buyerId) {
        return res.status(400).send({
            message: "All of the properties of the project object should be filled"
        });
    } //checking if all the required fields are filled or not if not passing an error message
    const project = new projectModel({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        duration: req.body.duration,
        buyerId: req.body.buyerId
    }) //creating a new project object
    project.save()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the project"
        })
    }) //saving the new project object in the database
}

const retrieveAllProjects = (req,res) => {
    projectModel.find()
    .then((projects) => res.send(projects))
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving the projects"
        })
    })
}

const retrieveProject = (req,res) => {
    projectModel.find({buyerId: req.params.buyerId})
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "Projects not found with buyer id " + req.params.buyerId
            })
        }
        res.send(project)
    })
    .catch(err => {
        if(err.kind == "ObjectId") {
            return res.status(404).send({
                message: "Projects not found with buyer id " + req.params.buyerId
            })
        }
        return res.status(500).send({
            message: "Error retrieving projects with buyer id " + req.params.buyerId
        })
    })
}

module.exports = {
    addingProject,
    retrieveAllProjects,
    retrieveProject
}