const express = require("express")
const router = express.Router()
const controller = require("./controllers/controller")

router.post("/registration", controller.registration)
router.post("/verification", controller.verification)
router.post("/forgotpassword", controller.sendForgotPassword)
router.put("/forgotpassword", controller.forgotPassword)
router.post("/login", controller.login)
router.get("/login", controller.getUser)
router.post("/logout", controller.logout)

router.get("/product", controller.getAll)
router.post("/product", controller.post)
router.get("/product/:id", controller.getOne)
router.put("/product/:id", controller.put)
router.delete("/product/:id", controller.delete)

router.post("/favorite/:id", controller.addFavorite)
router.get("/favorite", controller.getFavorite)
router.delete("/favorite/:id", controller.removeFavorite)

module.exports = router