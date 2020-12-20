const express = require("express")
const app = express()
const session = require("express-session")
const bodyParser = require("body-parser")
const router = require("./router")
const cors = require("cors")
const parameter = require("./parameter.json")

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
app.use(`/${parameter.fileupload.storage}`, express.static(parameter.fileupload.storage))

app.use("/", router)

/*app.use((req, res) => {
    res.status(404)
    res.send("<h1>404 Error!</h1>")
})*/

app.listen(parameter.app.port, () => {
    console.log(`Server is running on port ${parameter.app.port}...`)
})