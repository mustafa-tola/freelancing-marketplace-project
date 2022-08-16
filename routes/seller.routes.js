module.exports = (app) => {
    const sellerController = require("../controller/sellerController")
    
    app.post("/registerSeller", sellerController.addingSeller) //creating a /registerBuyer endpoint for POST method

    app.get("/retrieveSellers",sellerController.retrieveAllSellers) //creating a /retrieveBuyers endpoint for GET method

    app.get("/retrieveSellers/:email",sellerController.retrieveSeller) //creating a /retrieveBuyer endpoint for GET method
}