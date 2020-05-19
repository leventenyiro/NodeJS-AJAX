var express = require("express")
var router = express.Router()
var controller = require("./controllers/controller")

router.get("/products", controller.getAll)

router.post("/products", controller.post)

router.get("/products/:id", controller.getOne)

router.put("/products/:id", controller.put)

router.delete("/products/:id", controller.delete)

module.exports = router