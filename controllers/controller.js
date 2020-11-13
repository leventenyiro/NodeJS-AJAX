var Database = require("../models/Database")
var Bcrypt = require("../models/Bcrypt")
var Mailsend = require("../models/Mailsend")

function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkPassword(password) {
    return password.match(/[a-z]+/) && password.match(/[A-Z]+/) && password.match(/[0-9]+/) ? true : false
}

function checkRegistration(req) {
    if (req.body.username == "" || req.body.email == "" || req.body.password == "" || req.body.passwordAgain == "")
        return "Something is missing!"
    else if (req.body.username.length < 6)
        return "Username must be at least 6 character!"
    else if (!checkEmail(req.body.email))
        return "This e-mail address is not valid!"
    else if (req.body.password.length < 8)
        return "Password must be at least 8 character!"
    else if (!checkPassword(req.body.password))
        return "Password must contains at least 1 upper-character and 1 number!"
    else if (req.body.password != req.body.passwordAgain)
        return "Passwords aren't equal!"
}

function checkForgotPassword(req) {
    if (req.body.password == "" || req.body.passwordAgain == "")
        return "Something is missing!"
    else if (req.body.password.length < 8)
        return "Password must be at least 8 character!"
    else if (!checkPassword(req.body.password))
        return "Password must contains at least 1 upper-character and 1 number!"
    else if (req.body.password != req.body.passwordAgain)
        return "Passwords aren't equal!"
}

exports.registration = (req, res) => {
    var error = checkRegistration(req)
    if (error != null)
        res.json({ error: error })
    else {
        var db = new Database()
        var bcrypt = new Bcrypt()
        bcrypt.encrypt(req.body.password, (password) => {
            db.checkUsername(req, (result) => {
                if (result.length > 0) {
                    res.json({ error: "Username already exists!" })
                    db.end()
                } else {
                    db.checkEmail(req, (result) => {
                        if (result.length > 0) {
                            res.json({ error: "E-mail address already exists!" })
                            db.end()
                        } else {
                            db.registration(req, password)
                            db.sendEmailVerification(req, (result) => {
                                new Mailsend(req).verification(result);
                                res.statusCode = 200;
                                res.json({ success: "Successful registration, please activate your e-mail address!" })
                                db.end()
                            })
                        }
                    })
                }
            })
        })
    }
}

exports.login = (req, res) => {
    if (req.body.usernameEmail == "" || req.body.password == "")
        res.json({ error: "Something is missing!" })
    else {
        var db = new Database()
        var bcrypt = new Bcrypt()
        db.login(req, (result) => {
            if (result.length == 0) {
                res.json({ error: "Login is unsuccessful" })
                db.end()
            } else {
                if (result[0].email_verified == "0") {
                    db.sendEmailVerification(req, (result) => {
                        new Mailsend(req).verification(result);
                        res.json({ error: "You have to activate your e-mail address" })
                        db.end()
                    })
                } else {
                    bcrypt.decrypt(req.body.password, result[0].password, (hash) => {
                        if (hash) {
                            req.session.userId = result[0].id
                            res.json({ success: "" })
                            db.end()
                        } else {
                            res.statusCode = 401
                            res.json({ error: "Login is unsuccessful" })
                            db.end()
                        }
                    })
                }
            }
        })
    }
}

exports.getUser = (req, res) => {
    if (req.session.userId == null)
        res.json({ error: "" })
    else {
        var db = new Database()
        db.getUser(req, (result) => {
            if (result == undefined)
                res.json({ error: "You aren't logged in" })
            else
                res.json(result)
            db.end()
        })
    }
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err)
            res.json({ error: "Sikertelen kijelentkezés!" })
        else {
            res.clearCookie("session")
            res.json({ success: "Sikeres kijelentkezés!" })
        }
    })
}

exports.verification = (req, res) => {
    var db = new Database()
    db.emailVerification(req, (result) => {
        res.json(result)
        db.end()
    })
}

exports.sendForgotPassword = (req, res) => {
    if (req.body.email == "")
        res.json({ error: "Please add your e-mail address!" })
    var db = new Database()
    db.checkEmail(req, (result) => {
        if (result.length == 0) {
            res.json({ error: "There aren't user with this e-mail!" })
            db.end()
        } else {
            db.sendForgotPassword(req, (result) => {
                new Mailsend(req).forgotPassword(result);
                res.statusCode = 200
                res.send({ success: "E-mail has sent!" })
                db.end()
            })
        }
    })
}

exports.forgotPassword = (req, res) => {
    var db = new Database()
    db.checkForgotPasswordId(req, (result) => {
        if (result.length == 0) {
            res.json({ error: "This isn't a valid token!" })
        } else {
            var error = checkForgotPassword(req)
            if (error != null)
                res.json({ error: error })
            else {
                var db = new Database()
                var bcrypt = new Bcrypt()
                bcrypt.encrypt(req.body.password, (password) => {
                    db.forgotPassword(req, password, () => {
                        //res.statusCode = 200
                        res.json({ success: "Successful password change!" })
                        db.end()
                    })
                })
            }
        }
    })
    
}

exports.getAll = (req, res) => {
    /*if (req.session.userId == null)
        res.json({ error: "" })
    else {*/
        var db = new Database()
        db.getAll(req, (result) => {
            res.send(result)
            db.end()
        })
    //}
}

exports.post = (req, res) => {
    if (req.session.userId == null)
        res.json({ error: "" })
    else {
        var db = new Database()
        db.post(req, (result) => {
            res.send(result)
            db.end()
        })
    }
}

exports.getOne = (req, res) => {
    /*if (req.session.userId == null)
        res.json({ error: "" })
    else {*/
        var db = new Database()
        db.getOne(req, (result) => {
            res.send(result)
            db.end()
        })
    //}
}

exports.put = (req, res) => {
    if (req.session.userId == null)
        res.json({ error: "" })
    else {
        var db = new Database()
        db.put(req, () => {
            db.getAll(req, (result) => {
                res.send(result)
                db.end()
            })
        })
    }
}

exports.delete = (req, res) => {
    if (req.session.userId == null)
        res.json({ error: "" })
    else {
        var db = new Database()
        db.delete(req, () => {
            db.getAll(req, (result) => {
                res.send(result)
                db.end()
            })
        })
    }
}

exports.addFavorite = (req, res) => {
    if (req.session.userId == null)
        res.json({ error: "" })
    else {
        var db = new Database()
        db.addFavorite(req)
        res.end()
        db.end()
    }
}

exports.getFavorite = (req, res) => {
    if (req.session.userId == null)
        res.json({ error: "" })
    else {
        var db = new Database()
        db.getFavorite(req, (result) => {
            res.json(result)
            db.end()
        })
    }
}

exports.removeFavorite = (req, res) => {
    if (req.session.userId == null)
        res.json({ error: "" })
    else {
        var db = new Database()
        db.removeFavorite(req)
        res.end()
        db.end()
    }
}