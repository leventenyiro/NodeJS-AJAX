var Database = require("../models/Database")

exports.getAll = (req, res) => {
    var db = new Database()
    db.getAll((result) => {
        res.json(result)
    })
}

exports.post = (req,res) => {
    var db = new Database()
    db.post(req, (err) => {
        if (err) res.send("Valami nincs kitöltve")
        //res.send("Sikeres adatrögzítés")
        db.getAll((result) => {
            res.send(result)
        })
    })
}

exports.getOne = (req, res) => {
    var db = new Database()
    db.getOne(req, (result) => {
        res.send(result)
    })
}

exports.put = (req, res) => {
    var db = new Database()
    db.put(req, (err) => {
        if (err) res.send("Valami nincs kitöltve")
        //res.send("Sikeres módosítás")
        db.getAll((result) => {
            res.send(result)
        })
    })
}

exports.delete = (req, res) => {
    var db = new Database()
    db.delete(req, () => {
        //res.send("Sikeres törlés")
        db.getAll((result) => {
            res.send(result)
        })
    })
}