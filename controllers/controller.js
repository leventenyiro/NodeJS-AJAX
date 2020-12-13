const Database = require("../models/Database")
const Bcrypt = require("../models/Bcrypt")
const Mailsend = require("../models/Mailsend")
//const parameter = require("../parameter.json")
const languages = require("../languages.json")

function serverErr(req, res) {
    res.json({ error: languages[req.body.lang].errServer })
}

function headerLang(lang) {
    if (!lang in languages)
        lang = "en"
    return lang
}

function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkPassword(password) {
    return password.match(/[a-z]+/) && password.match(/[A-Z]+/) && password.match(/[0-9]+/) ? true : false
}

function checkRegistration(req) {
    if (req.body.username       == undefined || req.body.username       == "" ||
        req.body.email          == undefined || req.body.email          == "" ||
        req.body.password       == undefined || req.body.password       == "" ||
        req.body.passwordAgain  == undefined || req.body.passwordAgain  == "")
        //return languages[req.body.lang].sthMissing
        return languages[headerLang(req.headers["accept-language"])].sthMissing
    else if (req.body.username.length < 6)
        return languages[req.body.lang].usernameMinLength
    else if (!checkEmail(req.body.email))
        return languages[req.body.lang].emailInvalid
    else if (req.body.password.length < 8)
        return languages[req.body.lang].passwordMinLength
    else if (!checkPassword(req.body.password))
        return languages[req.body.lang].passwordFormat
    else if (req.body.password != req.body.passwordAgain)
        return languages[req.body.lang].passwordsNotEqual
}

function checkModify(req) {
    return undefined // should be done
}

function checkNewPassword(req) {
    if (req.body.password == "" || req.body.passwordAgain == "")
        return languages[req.body.lang].sthMissing
    else if (req.body.password.length < 8)
        return languages[req.body.lang].passwordMinLength
    else if (!checkPassword(req.body.password))
        return languages[req.body.lang].passwordFormat
    else if (req.body.password != req.body.passwordAgain)
        return languages[req.body.lang].passwordsNotEqual
}

exports.registration = (req, res) => {
    const error = checkRegistration(req)
    if (error != null)
        res.json({ error: error })
    else {
        const db = new Database()
        const bcrypt = new Bcrypt()
        bcrypt.encrypt(req.body.password, (password) => {
            // hibakezelés??
            db.checkUsername(req, (err, result) => {
                if (err) serverErr(req, res)
                else if (result.length > 0)
                    res.json({ error: languages[req.body.lang].usernameExists })
                else {
                    db.checkEmail(req, (err, result) => {
                        if (err) serverErr(req, res)
                        else if (result.length > 0)
                            res.json({ error: languages[req.body.lang].emailExists })
                        else {
                            db.registration(req, password, (err, result) => {
                                if (err) serverErr(req, res)
                                else {
                                    db.sendEmailVerification(result.id, (err, result) => {
                                        if (err) serverErr(req, res)
                                        else {
                                            new Mailsend().verification(req, result.id)
                                            // hibakezelés?? HA VALAMI NEM SIKERÜL VONJA VISSZA - delete
                                            res.json({ success: languages[req.body.lang].successfulRegistration })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    }
}

exports.verification = (req, res) => {
    const db = new Database()
    db.checkEmailVerification(req, (err, result) => {
        if (err) serverErr(req, res)
        else if (result.length == 0)
            res.json({ success: languages[req.body.lang].emailVerificationExpired })
        else {
            db.emailVerification(result[0].id, (err) => {
                if (err) serverErr(req, res)
                else {
                    db.deleteEmailVerification(result[0].id, (err) => {
                        if (err) serverErr(req, res)
                        else
                            res.json({ success: languages[req.body.lang].successfulEmailVerification })
                    })
                }
            })
        }
    })
}

exports.sendForgotPassword = (req, res) => {
    if (req.body.email == undefined || req.body.email == "")
        res.json({ error: languages[req.body.lang].addEmailAddress })
    else {
        const db = new Database()
        db.checkEmail(req, (err, result) => {
            if (err) serverErr(req, res)
            else if (result.length == 0)
                res.json({ error: languages[req.body.lang].noUserWithThisEmail })
            else {
                db.deleteForgotPassword(result[0].id, (err) => {
                    if (err) serverErr(req, res)
                    else {
                        db.insertForgotPassword(result[0].id, (err, result) => {
                            console.log(result.id)
                            if (err) serverErr(req, res)
                            else {
                                new Mailsend().forgotPassword(req, result.id)
                                res.json({ success: languages[req.body.lang].emailSent })
                            }
                        })
                    }
                })
            }
        })
    }
}

exports.forgotPassword = (req, res) => {
    const db = new Database()
    db.checkForgotPassword(req, (err, result) => {
        if (err) serverErr(req, res)
        if (result.length == 0)
            res.json({ error: languages[req.body.lang].invalidToken })
        else if (checkNewPassword(req) != null)
            res.json({ error: checkNewPassword(req) })
        else {
            db.modifyPassword(result[0].id, req.body.password, (err) => {
                if (err) serverErr(req, res)
                db.deleteForgotPassword(result[0].id, (err) => {
                    if (err) serverErr(req, res)
                    else
                        res.json({ success: languages[req.body.lang].successfulPasswordModify })
                })
            })
        }
    })
}

exports.login = (req, res) => {
    if (req.body.usernameEmail == undefined || req.body.usernameEmail == "" ||
        req.body.password == undefined || req.body.password == "")
        res.json({ error: languages[req.body.lang].sthMissing })
    else {
        const db = new Database()
        const bcrypt = new Bcrypt()
        db.login(req, (err, result) => {
            if (err) serverErr(req, res)
            else if (result.length == 0) {
                res.json({ error: languages[req.body.lang].unsuccessfulLogin })
            } else {
                if (result[0].email_verified == "0") {
                    db.sendEmailVerification(req, (result) => {
                        new Mailsend().verification(req, result);
                        res.json({ error: languages[req.body.lang].activateEmail })
                    })
                } else {
                    bcrypt.decrypt(req.body.password, result[0].password, (hash) => {
                        if (hash) {
                            req.session.userId = result[0].id
                            res.json({ success: languages[req.body.lang].successfulLogin })
                        } else {
                            //res.statusCode = 401
                            res.json({ error: languages[req.body.lang].unsuccessfulLogin })
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