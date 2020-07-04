var Database = require("../models/Database")
const Bcrypt = require("../models/Bcrypt")
const Mailsend = require("../models/Mailsend")

exports.registration = (req, res) => {
    var db = new Database()
    var bcrypt = new Bcrypt()
    bcrypt.encrypt(req.body.password, (password) => {
        db.registration(req, password, (result) => {
            if (result == "exists") res.send(result)
            else var mailsend = new Mailsend(req)
            res.send(result)
            db.end()
        })
    })
}

exports.login = (req, res) => {
    var db = new Database()
    var bcrypt = new Bcrypt()
    db.login(req, (result) => {
        if (result.length > 0) {
            if (result[0].email_verified == "0") res.json({ error: "E-mail address is not verificated"})
            else {
                bcrypt.decrypt(req.body.password, result[0].password, (hash) => {
                    if (hash) res.json({ id: result[0].id })
                    else res.json({ error: "Login is unsuccessful" })
                })
            }
        } else res.json({ error: "Login is unsuccessful" })
        db.end()
    })
}

exports.verification = (req, res) => {
    var db = new Database()
    db.emailVerification(req, (result) => {
        res.send(result)
        db.end()
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