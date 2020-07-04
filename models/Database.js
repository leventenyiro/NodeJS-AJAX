class Database {
    constructor() {
        var mysql = require("mysql")
        this.conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "restapi"
        })
    }

    registration(req, password, callback) {
        this.generateNewHashedId()
        var sql = `INSERT INTO user (id, username, email, password, email_verified) VALUES (
            "${this.hashedUserId}",
            "${req.body.username}",
            "${req.body.email}",
            "${password}",
            "0"
        )`
        this.conn.query(sql, (err) => {
            if (err) return callback("exists")
            return callback("success")
        })
    }

    generateNewHashedId() {
        this.hashedUserId = require("crypto").randomBytes(10).toString("hex")
        this.conn.query(`SELECT COUNT(*) AS count FROM user WHERE id = "${this.hashedId}"`, (err, result) => {
            if (result[0].count === 1) this.generateNewHashedId()
        })
    }

    emailVerification(req, callback) {
        this.conn.query(`SELECT email_verified FROM user WHERE email="${req.body.email}"`, (err, result) => {
            if (err) throw err
            else {
                if (result[0].email_verified == 1) callback("already")
                else {
                    var sql = `UPDATE user SET email_verified = "1" WHERE email = "${req.body.email}"`
                    this.conn.query(sql, (err) => {
                        if (err) throw err
                        return callback("success")
                    })
                }
            }
        })

    }

    login(req, callback) {
        var sql = `SELECT id, password, email_verified FROM user WHERE username = "${req.body.usernameEmail}" OR email = "${req.body.usernameEmail}"`
        this.conn.query(sql, (err, result) => {
            if (err) return callback("error")
            return callback()
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
            return callback(result[0])
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

    end() {
        this.conn.end()
    }
}

module.exports = Database