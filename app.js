var express = require("express")
var app = express()
var session = require("express-session")
var bodyParser = require("body-parser")
var router = require("./router")
var cors = require("cors")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: "http://localhost"}))
app.use(session({
    name: "session",
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    unset: 'destroy',
    cookie: {
        maxAge: null
    }
}))

app.use("/", router)

app.use((req, res) => {
    res.status(404)
    res.send("<h1>404 Error!</h1>")
})

app.listen(8080, () => {
    console.log("Server is running...")
})