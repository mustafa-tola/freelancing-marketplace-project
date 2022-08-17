module.exports = (app) => {
    const projectController = require("../controller/projectController")
    
    app.post("/registerProject", projectController.addingProject) //creating a /registerProject endpoint for POST method

    app.get("/retrieveProjects",projectController.retrieveAllProjects) //creating a /retrieveProjects endpoint for GET method

    app.get("/retrieveProject/:buyerId",projectController.retrieveProject) //creating a /retrieveProject endpoint for GET method
}