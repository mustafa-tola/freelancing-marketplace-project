module.exports = (app) => {
    const requestController = require("../controller/requestController")
    
    app.post("/registerOrderRequest", requestController.addingOrderRequest) //creating a /registerOrderRequest endpoint for POST method

    // app.put("/updateOrderStatus/:orderId",orderController.updateOrderStatus) //creating a /updateOrderStatus/:orderId endpoint for PUT method

    app.get("/retrieveOrderRequests/:email",requestController.retrieveOrderRequestsOfASeller) //creating a /retrieveOrderRequests/:email endpoint for GET method

    app.get("/retrieveOrderRequest/:id",requestController.retrieveOrderRequest) //creating a /retrieveOrderRequest/:id endpoint for GET method
}