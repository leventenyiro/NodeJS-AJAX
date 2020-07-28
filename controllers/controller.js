var Database = require("../models/Database")
var Bcrypt = require("../models/Bcrypt")
var Mailsend = require("../models/Mailsend")

exports.registration = (req, res) => {
    var db = new Database()
    var bcrypt = new Bcrypt()
    bcrypt.encrypt(req.body.password, (password) => {
        db.checkUsername(req, (result) => {
            if (result.length > 0) {
                res.json({ error: "Username already exists" })
                db.end()
            }
            else {
                db.checkEmail(req, (result) => {
                    if (result.length > 0) {
                        res.json({ error: "E-mail address already exists" })
                        db.end()
                    } else {
                        db.registration(req, password)
                        db.sendEmailVerification(req, (result) => {
                            new Mailsend(req).verification(result);
                            res.json({ message: "Successful registration" })
                            db.end()
                        })
                    }
                })
            }
        })
    })
}

exports.login = (req, res) => {
    var db = new Database()
    var bcrypt = new Bcrypt()
    db.login(req, (result) => {
        if (result.length > 0) {
            if (result[0].email_verified == "0") {
                db.sendEmailVerification(req, (result) => {
                    new Mailsend(req).verification(result);
                    res.json({ message: "Please activate your e-mail address" })
                    db.end()
                })
            } else {
                bcrypt.decrypt(req.body.password, result[0].password, (hash) => {
                    if (hash) {
                        req.session.userId = result[0].id
                        res.end()
                        db.end()
                    } else {
                        res.statusCode = 401
                        res.json({ error: "Login is unsuccessful" })
                        db.end()
                    }
                })
            }
        } else {
            res.json({ error: "Login is unsuccessful" })
            db.end()
        }
    })
}

exports.getUser = (req, res) => {
    var db = new Database()
    db.getUser(req, (result) => {
        res.json(result[0])
    })
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err
        res.clearCookie("session")
        res.end()
    })
}

exports.verification = (req, res) => {
    var db = new Database()
    db.emailVerification(req, (result) => {
        res.send(result)
        db.end()
    })
}

exports.sendForgotPassword = (req, res) => {
    var db = new Database()
    db.sendForgotPassword(req, (result) => {
        new Mailsend(req).forgotPassword(result);
        res.send(result)
        db.end()
    })
}

exports.forgotPassword = (req, res) => {
    var db = new Database()
    var bcrypt = new Bcrypt()
    bcrypt.encrypt(req.body.password, (password) => {
        db.forgotPassword(req, password, (result) => {
            res.json({ message: "E-mail has sent." })
            db.end()
        })
    })
}

exports.getAll = (req, res) => {
    var db = new Database()
    db.getAll(req, (result) => {
        res.send(result)
        db.end()
    })
}

exports.post = (req, res) => {
    var db = new Database()
    db.post(req, () => {
        db.getAll(req, (result) => {
            res.send(result)
            db.end()
        })
    })
}

exports.getOne = (req, res) => {
    var db = new Database()
    db.getOne(req, (result) => {
        res.send(result)
        db.end()
    })
}

exports.put = (req, res) => {
    var db = new Database()
    db.put(req, () => {
        db.getAll(req, (result) => {
            res.send(result)
            db.end()
        })
    })
}

exports.delete = (req, res) => {
    var db = new Database()
    db.delete(req, () => {
        db.getAll(req, (result) => {
            res.send(result)
            db.end()
        })
    })
}