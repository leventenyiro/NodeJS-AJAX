var Database = require("../models/Database")

exports.getAll = (req, res) => {
    var db = new Database()
    db.getAll(req, (result) => {
        res.send(result)
        db.release()
    })
}

exports.post = (req, res) => {
    var db = new Database()
    db.post(req, () => {
        db.getAll(req, (result) => {
            res.send(result)
            db.release()
        })
    })
}

exports.getOne = (req, res) => {
    var db = new Database()
    db.getOne(req, (result) => {
        res.send(result)
        db.release()
    })
}

exports.put = (req, res) => {
    var db = new Database()
    db.put(req, () => {
        db.getAll(req, (result) => {
            res.send(result)
            db.release()
        })
    })
}

exports.delete = (req, res) => {
    var db = new Database()
    db.delete(req, () => {
        db.getAll(req, (result) => {
            res.send(result)
            db.release()
        })
    })
}