var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var router = require("./router")
var path = require("path")

app.use(bodyParser.urlencoded({ extended: false }))
app.use("/public", express.static(path.join(__dirname, "/public")))
//app.set("view engine", "hbs")
app.use(bodyParser.json())

app.use("/", router)

app.listen(8080, () => {
    console.log("Server is running...")
})

// https://stackabuse.com/building-a-rest-api-with-node-and-express/