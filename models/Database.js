const  parameter = require("../parameter.json")

class Database {
    constructor() {
        var mysql = require("mysql")
        this.conn = mysql.createConnection({
            host: parameter.db.host,
            user: parameter.db.user,
            password: parameter.db.password,
            database: parameter.db.database
        })
        this.hashedId = ""
    }

    generateNewHashedId(table) {
        this.hashedId = require("crypto").randomBytes(10).toString("hex")
        var sql = `SELECT COUNT(*) AS count FROM ${table} WHERE id = "${this.hashedId}"`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            else if (result[0].count == 1) this.generateNewHashedId(table);
        })
    }

    checkUsername(req, callback) {
        this.conn.query(`SELECT * FROM user WHERE username = "${req.body.username}" AND email_verified = 1`, (err, result) => {
            if (err)
                return callback(err, null)
            return callback(null, result)
        })
    }

    checkEmail(req, callback) {
        this.conn.query(`SELECT * FROM user WHERE email = "${req.body.email}" AND email_verified = 1`, (err, result) => {
            if (err)
                return callback(err, null)
            return callback(null, result)
        })
    }
    
    registration(req, password, callback) {
        this.generateNewHashedId(`user`)
        var sql = `INSERT INTO user (id, username, email, password, email_verified, image) VALUES (
            "${this.hashedId}",
            "${req.body.username}",
            "${req.body.email}",
            "${password}",
            "0",
            "profile.png")
            ON DUPLICATE KEY UPDATE username = "${req.body.username}", email = "${req.body.email}"`
        this.conn.query(sql, (err) => {
            if (err)
                return callback(err, null)
            return callback(null, { id: this.hashedId })
        })
    }

    sendEmailVerification(id, callback) {
        this.generateNewHashedId(`email_verification`)
        const sql = `INSERT INTO email_verification (id, user_id, expiration) VALUES ("${this.hashedId}", "${id}", NOW() + INTERVAL 30 day)`
        this.conn.query(sql, (err) => {
            if (err) return callback(err, null)
            return callback(null, { id: this.hashedId })
        })
    }

    checkEmailVerification(req, callback) {
        const sql = `SELECT u.id, email_verified FROM user u
        LEFT JOIN email_verification e ON u.id = e.user_id
        WHERE e.id = "${req.body.id}"`
        this.conn.query(sql, (err, result) => {
            if (err) return callback(err, null)
            return callback(null, result)
        })
    }

    emailVerification(userId, callback) {
        const sql = `UPDATE user SET email_verified = "1" WHERE id = "${userId}"`
        this.conn.query(sql, (err) => {
            if (err) return callback(err)
            return callback(null)
        })
    }

    deleteEmailVerification(userId, callback) {
        const sql = `DELETE FROM email_verification WHERE id = "${userId}"`
        this.conn.query(sql, (err) => {
            if (err) return callback(err)
            return callback(null)
        })
    }

    login(req, callback) {
        const sql = `SELECT id, password, email_verified FROM user WHERE username = "${req.body.usernameEmail}" OR email = "${req.body.usernameEmail}"`
        this.conn.query(sql, (err, result) => {
            if (err)
                return callback(err, null)
            return callback(null, result)
        })
    }

    deleteForgotPassword(userId, callback) {
        const sql = `DELETE FROM forgot_password WHERE user_id = "${userId}"`
        this.conn.query(sql, (err) => {
            if (err) return callback(err)
            return callback(null)
        })
    }

    insertForgotPassword(userId, callback) {
        this.generateNewHashedId(`forgot_password`)
        const sql = `INSERT INTO forgot_password (id, user_id, expiration) VALUES ("${this.hashedId}", "${userId}", NOW() + INTERVAL 7 day)`
        this.conn.query(sql, (err) => {
            if (err) return callback(err, null)
            return callback(null, { id: this.hashedId })
        })
    }

    checkForgotPassword(req, callback) {
        const sql = `SELECT u.id FROM user u LEFT JOIN forgot_password f ON u.id = f.user_id WHERE f.id = "${req.body.id}"`
        this.conn.query(sql, (err, result) => {
            if (err) return callback(err, null)
            return callback(null, result)
        })
    }

    modifyPassword(userId, password, callback) {
        const sql = `UPDATE user SET password = "${password}" WHERE id = "${userId}"`
        this.conn.query(sql, (err) => {
            if (err) return callback(err)
            return callback(null)
        })
    }

    getUser(req, callback) {
        var sql = `SELECT id, username, email FROM user WHERE id = "${req.session.userId}" OR username = "${req.body.name}" OR email = "${req.body.email}"`
        this.conn.query(sql, (err, result) => {
            if (err) return callback(err, null)
            return callback(null, result[0])
        })
    }

    deleteUser(req, callback) {
        const sql = `DELETE FROM user WHERE id = "${req.body.userId}"`
        this.conn.query(sql, (err) => {
            if (err) return callback(err)
            return callback(null)
        })
    }

    getAll(req, callback) {
        var sql = "SELECT * FROM product"
        if (req.query.search != undefined) {
            sql += ` WHERE name LIKE "${req.query.search}%"`
        }
        sql += " ORDER BY name"
        this.conn.query(sql, (err, result) => {
            if (err) return callback(err, null)
            return callback(null, result)
        })
    }

    post(req, callback) {
        this.generateNewHashedId(`product`)
        var sql = `INSERT INTO product (id, name, price, availability) VALUES ("${this.hashedId}", "${req.body.name}",${req.body.price}, ${req.body.availability})`
        this.conn.query(sql, (err, result) => {
            if (err)
                return callback({ error: "Ez már benne van az adatbázisban!" })
            return callback({ success: "Sikeres rögzítés!" })
        })
    }

    getOne(req, callback) {
        var sql = `SELECT * FROM product WHERE id = "${req.params.id}"`
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            return callback(result[0])
        })
    }

    put(req, callback) {
        var sql = `UPDATE product SET name = "${req.body.name}", price = ${req.body.price}, availability = ${req.body.availability} WHERE id = "${req.params.id}"`
        this.conn.query(sql, (err, result) => {
            if (err)
                return callback({ error: "Ez már benne van az adatbázisban!" })
            return callback({ success: "Sikeres rögzítés!" })
        })
    }

    delete(req, callback) {
        var sql = `DELETE FROM product WHERE id = "${req.params.id}"`
        this.conn.query(sql, (err, result) => {
            if (err)
                return callback({ error: "Sikertelen törlés!" })
            return callback({ success: "Sikeres törlés!" })
        })
    }

    addFavorite(req) {
        this.generateNewHashedId(`favorite`)
        this.conn.query(`INSERT INTO favorite (id, product_id, user_id) VALUES ("${this.hashedId}", "${req.body.productId}", "${req.session.userId}")`)
    }

    getFavorite(req, callback) {
        var sql = `SELECT f.id "favoriteId", p.name "name", p.price "price", p.availability "availability" FROM favorite f INNER JOIN product p ON f.product_id = p.id WHERE user_id = "${req.session.userId}"`
        if (req.query.search != undefined) {
            sql += ` AND name LIKE "${req.query.search}%"`
        }
        sql += " ORDER BY name"
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            return callback(result)
        })
    }

    removeFavorite(req) {
        this.conn.query(`DELETE FROM favorite WHERE id = "${req.body.id}"`)
    }

    end() {
        this.conn.end()
    }
}

module.exports = Database