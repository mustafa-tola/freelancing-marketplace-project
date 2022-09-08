const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()
const methodOverride = require("method-override")
const multer = require("multer")
const {GridFsStorage} = require("multer-gridfs-storage")
const path = require("path")
const crypto = require('crypto');

const app = express() //making a new server
app.use(express.json()) //telling the server that data incoming and outgoing will be of json type
mongoose.connect(process.env.REACT_APP_MONGODB_DEPLOYMENT_URL).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.Exiting now...', err);
    process.exit();
}); //the second parameters will help us in removing warnings
app.use(cors())

let gfs;
const connect = mongoose.createConnection(process.env.REACT_APP_MONGODB_DEPLOYMENT_URL);
connect.once('open',() => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db,{
        bucketName: 'uploads'
    })
})

app.listen(9999,() => {
    console.log('Server up at 9999')
}) //Starting the nodejs server at localhost:9999

const storage = new GridFsStorage({
    url: process.env.REACT_APP_MONGODB_DEPLOYMENT_URL,
    file: (req,file) => {
        return new Promise((res,rej) => {
            crypto.randomBytes(16, (err,buf) => {
                if (err) {
                    return rej(err);
                }
                const fileInfo = {
                    filename: file.originalname,
                    bucketName: 'uploads'
                };
                res(fileInfo);
            })
        })
    }
})

const upload = multer({storage});
require("./routes/file.routes")(app,upload)
require("./routes/buyer.routes")(app)
require("./routes/seller.routes")(app)
require("./routes/order.routes")(app)
require("./routes/project.routes")(app)
require("./routes/category.routes")(app)
require("./routes/request.routes")(app)