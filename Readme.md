**Step 1:-** Run npm install where you have cloned this project

**Step 2:-** Install nodemon globally on the pc through npm install nodemon --global and run nodemon server.js command in the project.This starts the project

**Step 3:-** Understand the below routes for usage

**1.** /registerBuyer registers a new buyer in our database.You have to attach a json object with required fields (email,name,phone) and sent to this endpoint to create a new buyer in the database

**2.** /retrieveBuyers gets all the buyers from the database.

**3.** /retrieveBuyer/:email gets a single buyer from the database by passing an email(abc@gmail.com) after retrieveBuyer/ to obtain the buyer with the respective email

**4.** /registerSeller registers a new seller in our database.You have to attach a json object with required fields (email,name,phone,service) and sent to this endpoint to create a new seller in the database

**5.** /retrieveSellers gets all the sellers from the database.

**6.** /retrieveSeller/:email gets a single seller from the database by passing an email(abc@gmail.com) after retrieveSeller/ to obtain the seller with the respective email

**7.** /registerOrder registers a new order in our database.You have to attach a json object with required fields (title,description,category,price,duration,status,buyerId,sellerId) and sent to this endpoint to create a new order in the database

**8.** /retrieveOrders/:email gets a number of orders for the given email(abc@gmail.com) after retrieveOrders/ to obtain multiple orders for the email

**9.** /retrieveOrder/:id gets the details of an order with given id(abcdef12345) after retrieveOrder/ to obtain order details for an id

**10.** /updateOrderStatus/:orderId updates the status of order for the given id(abcdef12345) after updateOrderStatus/ to update status of order for an order id

**Note: -** In seller entity,rating attribute refers to the rating given to seller in its last project.
