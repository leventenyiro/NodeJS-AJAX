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

    getAll(callback) {
        this.conn.connect(() => {
            this.conn.query("SELECT * FROM raktar", (err, result) => {
                return callback(result)
            })
        })
    }

    post(req, callback) {
        this.conn.connect(() => {
            var sql = `INSERT INTO raktar (nev, ar, keszleten) VALUES ("${req.body.nev}", ${req.body.ar}, ${req.body.keszleten})`
            console.log(sql)
            this.conn.query(sql, (err) => {
                return callback(err)
            })
        })
    }

    getOne(req, callback) {
        this.conn.connect(() => {
            var sql = `SELECT * FROM raktar WHERE id = ${req.params.id}`
            this.conn.query(sql, (err, result) => {
                return callback(result)
            })
        })
    }

    put(req, callback) {
        this.conn.connect(() => {
            var sql = `UPDATE raktar SET nev = "${req.body.nev}", ar = ${req.body.ar}, keszleten = ${req.body.keszleten} WHERE id = ${req.params.id}`
            this.conn.query(sql, (err) => {
                return callback(err)
            })
        })
    }

    delete(req, callback) {
        this.conn.connect(() => {
            var sql = `DELETE FROM raktar WHERE id = ${req.params.id}`
            this.conn.query(sql, () => {
                return callback()
            })
        })
    }
}

module.exports = Database