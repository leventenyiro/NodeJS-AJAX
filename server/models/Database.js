class Database {
    constructor() {
        var mysql = require("mysql")
        this.conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "ajax"
        })
    }

    getAll(req, callback) {
        var sql = "SELECT * FROM raktar"
        if (req.query.search != undefined) {
            sql += ` WHERE nev LIKE "${req.query.search}%"`
        }
        sql += " ORDER BY id"
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            return callback(result)
        })
    }

    post(req, callback) {
        var sql = `INSERT INTO raktar (nev, ar, keszleten) VALUES ("${req.body.nev}",${req.body.ar}, ${req.body.keszleten})`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            return callback(result)
        })
    }

    getOne(req, callback) {
        var sql = `SELECT * FROM raktar WHERE id = ${req.params.id}`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            return callback(result)
        })
    }

    put(req, callback) {
        var sql = `UPDATE raktar SET nev = "${req.body.nev}", ar = ${req.body.ar}, keszleten = ${req.body.keszleten} WHERE id = ${req.params.id}`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            return callback(result)
        })
    }

    delete(req, callback) {
        var sql = `DELETE FROM raktar WHERE id = ${req.params.id}`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            return callback(result)
        })
    }

    release() {
        this.conn.end()
    }
}

module.exports = Database