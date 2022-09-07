const orderModel = require("../model/order");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path")

let gfs;
const connect = mongoose.createConnection(process.env.REACT_APP_MONGODB_DEPLOYMENT_URL);
connect.once('open',() => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db,{
        bucketName: 'uploads'
    })
})

const addFile = (req,res,next) => { //pass the order id while calling this apis route
    console.log(req.file);
    orderModel.orderModel.findByIdAndUpdate(req.params.id,{file: req.file.id})
        .then(order => res.send(order))
        .catch(err => res.send(err.message))
}

const getOrderFile = (req,res,next) => { //pass the file name while calling this apis route
    gfs.openDownloadStreamByName(req.params.name).pipe(fs.createWriteStream(__dirname+"\\downloadFile"+path.extname(req.params.name)))
    return res.send("File downloaded on this location: - "+__dirname);
}

const deleteFile = (req,res,next) => { //pass the file id as well as order id while calling this api's route
    gfs.delete(new mongoose.Types.ObjectId(req.params.id),(err,data) => {
        if(err) {
            res.status(404).json({err})
        }
        orderModel.orderModel.findByIdAndUpdate(req.body.orderId,{file: ""})
            .then(order => res.send("File deleted"))
        .catch(err => res.send(err.message))
    })
}

module.exports = {
    addFile,
    getOrderFile,
    deleteFile
}