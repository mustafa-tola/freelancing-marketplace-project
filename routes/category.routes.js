module.exports = (app) => {
    const categoryController = require("../controller/categoryController")
    
    app.post("/registerCategory", categoryController.addingCategory) //creating a /registerProject endpoint for POST method

    app.get("/retrieveCategories",categoryController.retrieveAllCategories) //creating a /retrieveCategories endpoint for GET method

    app.get("/retrieveCategory/:name",categoryController.retrieveCategory) //creating a /retrieveCategory endpoint for GET method
}