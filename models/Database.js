class Database {
    constructor() {
        this.mysql = require("mysql")
        this.async = require("async")
        this.conn = this.mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "ajax"
        })
    }

    getAll(req, callback) {
        this.async.forever(() => {
            this.conn.getConnection((err, connection) => {
                if (err) throw err

                var sql = "SELECT * FROM raktar"
                if (req.query.search != undefined) {
                    sql += ` WHERE nev LIKE "${req.query.search}%"`
                }
                sql += " ORDER BY id"

                connection.query(sql, (err, result) => {
                    if (err) throw err;
                    connection.release()
                    return callback(result)
                })
            })
            
        })
    }

    post(req, callback) {
        this.async.forever(() => {
            this.conn.getConnection((err, connection) => {
                if (err) throw err
                var sql = `INSERT INTO raktar (nev, ar, keszleten) VALUES ("${req.body.nev}", ${req.body.ar}, ${req.body.keszleten})`
                connection.query(sql, (err, result) => {
                    if (err) throw err
                    connection.release()
                    return callback(result)
                })
            })
        })
    }

    getOne(req, callback) {
        this.async.forever(() => {
            this.conn.getConnection((err, connection) => {
                if (err) throw err
                var sql = `SELECT * FROM raktar WHERE id = ${req.params.id}`
                connection.query(sql, (err, result) => {
                    if (err) throw err
                    connection.release()
                    return callback(result)
                })
            })
        })
    }

    put(req, callback) {
        this.async.forever(() => {
            this.conn.getConnection((err, connection) => {
                if (err) throw err
                var sql = `UPDATE raktar SET nev = "${req.body.nev}", ar = ${req.body.ar}, keszleten = ${req.body.keszleten} WHERE id = ${req.params.id}`
                connection.query(sql, (err, result) => {
                    if (err) throw err
                    connection.release()
                    return callback(result)
                })
            })
        })
    }

    delete(req, callback) {
        this.async.forever(() => {
            this.conn.getConnection((err, connection) => {
                if (err) throw err
                var sql = `DELETE FROM raktar WHERE id = ${req.params.id}`
                connection.query(sql, (err, result) => {
                    if (err) throw err
                    connection.release()
                    return callback(result)
                })
            })
        })
    }
}

module.exports = Database