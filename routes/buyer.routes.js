module.exports = (app) => {
    const buyerController = require("../controller/buyerController")
    
    app.post("/registerBuyer", buyerController.addingBuyer) //creating a /registerBuyer endpoint for POST method

    app.get("/retrieveBuyers",buyerController.retrieveAllBuyers) //creating a /retrieveBuyers endpoint for GET method

    app.get("/retrieveBuyer/:email",buyerController.retrieveBuyer) //creating a /retrieveBuyer endpoint for GET method
}