const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const { url } = require("./config/db.config")

const app = express() //making a new server
app.use(express.json()) //telling the server that data incoming and outgoing will be of json type
mongoose.connect(url).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
}); //the second parameters will help us in removing warnings
app.use(cors())

require("./routes/buyer.routes")(app)
require("./routes/seller.routes")(app)
require("./routes/order.routes")(app)
require("./routes/project.routes")(app)
require("./routes/category.routes")(app)
require("./routes/request.routes")(app)

app.listen(9999,() => {
    console.log('Server up at 9999')
}) //Starting the nodejs server at localhost:9999