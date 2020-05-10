var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var router = require("./router")
var path = require("path")
var cors = require("cors")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/", router)

app.use((req, res) => {
    res.status(404)
    res.send("<h1>404 Error!</h1>")
})

app.listen(8080, () => {
    console.log("Server is running...")
})