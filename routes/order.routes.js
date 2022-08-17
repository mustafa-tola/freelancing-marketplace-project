module.exports = (app) => {
    const orderController = require("../controller/orderController")
    
    app.post("/registerOrder", orderController.addingOrder) //creating a /registerOrder endpoint for POST method

    app.put("/updateOrderStatus/:orderId",orderController.updateOrderStatus) //creating a /updateOrderStatus/:orderId endpoint for PUT method

    app.get("/retrieveOrders/:email",orderController.retrieveOrdersOfASeller) //creating a /retrieveOrders/:email endpoint for GET method

    app.get("/retrieveOrder/:id",orderController.retrieveOrder) //creating a /retrieveOrder/:id endpoint for GET method
}