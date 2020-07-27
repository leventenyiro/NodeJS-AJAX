class Database {
    constructor() {
        var mysql = require("mysql")
        this.conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "restapi"
        })
        this.hashedId = ""
    }

    checkUsername(req, callback) {
        this.conn.query(`SELECT * FROM user WHERE username = "${req.body.username}"`, (err, result) => {
            if (err) throw err
            return callback(result)
        })
    }

    checkEmail(req, callback) {
        this.conn.query(`SELECT * FROM user WHERE email = "${req.body.email}"`, (err, result) => {
            if (err) throw err
            return callback(result)
        })
    }
    
    registration(req, password) {
        this.generateNewHashedId(`user`)
        var sql = `INSERT INTO user (id, username, email, password, email_verified) VALUES (
            "${this.hashedId}",
            "${req.body.username}",
            "${req.body.email}",
            "${password}",
            "0")`
        this.conn.query(sql, (err) => {
            if (err) return callback("exists")
        })
    }

    generateNewHashedId(table) {
        this.hashedId = require("crypto").randomBytes(10).toString("hex")
        var sql = `SELECT COUNT(*) AS count FROM ${table} WHERE id = "${this.hashedId}"`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            else if (result[0].count == 1) this.generateNewHashedId(table);
        })
    }

    sendEmailVerification(req, callback) {
        var sql = `SELECT id FROM user WHERE username = "${req.body.usernameEmail}" OR email = "${req.body.usernameEmail}" OR username = "${req.body.username}"`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
                this.conn.query(`DELETE FROM email_verification WHERE user_id = "${result[0].id}"`, (err) => {
                    if (err) throw err
                        this.generateNewHashedId(`email_verification`)
                        var sql = `INSERT INTO email_verification (id, user_id, expiration) VALUES ("${this.hashedId}", "${result[0].id}", NOW() + INTERVAL 30 day)`
                        this.conn.query(sql, (err) => {
                            if (err) throw err
                            return callback(this.hashedId)
                        })
                })
        })
    }

    emailVerification(req, callback) {
        var sql = `SELECT u.id, email_verified FROM user u
        LEFT JOIN email_verification e ON u.id = e.user_id
        WHERE e.id = "${req.body.id}"`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            else {
                if (result[0].email_verified == 1) callback("already")
                else {
                    var sql = `UPDATE user SET email_verified = "1" WHERE id = "${result[0].id}"`
                    this.conn.query(sql)
                    this.conn.query(`DELETE FROM email_verification WHERE id = "${req.body.id}"`)
                    return callback("success")
                }
            }
        })
    }



    login(req, callback) {
        var sql = `SELECT id, password, email_verified FROM user WHERE username = "${req.body.usernameEmail}" OR email = "${req.body.usernameEmail}"`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            return callback(result)
        })
    }

    getUser(req, callback) {
        var sql = `SELECT id, username, email FROM user WHERE id = "${req.session.userId}"`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            return callback(result)
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