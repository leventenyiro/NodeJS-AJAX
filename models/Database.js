class Database {
    constructor() {
        this.mysql = require("mysql")
        this.conn = this.mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "ajax"
        })
    }

    getAll(req, callback) {
        this.conn.connect((err) => {
            if (err) throw err
            var sql = "SELECT * FROM raktar"
            if (req.query.search != undefined) {
                sql += ` WHERE nev LIKE "${req.query.search}%"`
            }
            sql += " ORDER BY id"
            this.conn.query(sql, (err, result) => {
                if (err) throw err
                return callback(result)
            })
        })
    }

    post(req, callback) {
        this.conn.connect((err) => {
            if (err) throw err
            var sql = `INSERT INTO raktar (nev, ar, keszleten) VALUES ("${req.body.nev}", ${req.body.ar}, ${req.body.keszleten})`
            this.conn.query(sql, (err) => {
                if (err) throw err
                return callback(err)
            })
        })
    }

    getOne(req, callback) {
        this.conn.connect((err) => {
            if (err) throw err
            var sql = `SELECT * FROM raktar WHERE id = ${req.params.id}`
            this.conn.query(sql, (err, result) => {
                if (err) throw err
                return callback(result)
            })
        })
    }

    put(req, callback) {
        this.conn.connect((err) => {
            if (err) throw err
            var sql = `UPDATE raktar SET nev = "${req.body.nev}", ar = ${req.body.ar}, keszleten = ${req.body.keszleten} WHERE id = ${req.params.id}`
            this.conn.query(sql, (err) => {
                if (err) throw err
                return callback(err)
            })
        })
    }

    delete(req, callback) {
        this.conn.connect((err) => {
            if (err) throw err
            var sql = `DELETE FROM raktar WHERE id = ${req.params.id}`
            this.conn.query(sql, (err) => {
                if (err) throw err
                return callback()
            })
        })
    }
}

module.exports = Database