const { addFile, getOrderFile, deleteFile } = require("../controller/fileController")

module.exports = (app,upload,gfs) => {
    app.post("/uploadOrderFile/:id",upload.single('file'),addFile)

    app.get("/getOrderFile/:name",getOrderFile)

    app.post("/deleteOrderFile/:id",deleteFile)
}