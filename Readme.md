**Step 1:-** Run npm install where you have cloned this project

**Step 2:-** Install nodemon globally on the pc through npm install nodemon --global and run nodemon server.js command in the project.This starts the project

**Step 2:-** Understand the below routes for usage

**1.** /registerBuyer registers a new buyer in our database.You have to attach a json object with required fields (email,name,phone) and sent to this endpoint to create a new buyer in the database

**2.** /retrieveBuyers gets all the buyers from the database.

**3.** /retrieveBuyer/:email gets a single buyer from the database by passing an email(abc@gmail.com) after retrieveBuyer/ to obtain the buyer with the respective email