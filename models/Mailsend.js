const parameter = require("../parameter.json")
class Mailsend {
    constructor() {
        var nodemailer = require("nodemailer")
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: parameter.mailsend.user,
                pass: parameter.mailsend.password
            }
        })
    }

    verification(req, emailVerificationId) {
        let email = req.body.email
        if (email == undefined) email = req.body.usernameEmail
        this.mailOptions = {
            from: parameter.mailsend.user,
            to: email,
            subject: "Email verification",
            html: `
                <h1>Hey ${req.body.username}!</h1>
                <h2>Verificate your E-mail address</h2>
                <a href="${parameter.mailsend.url}email.html?id=${emailVerificationId}">Verification</a>
                `
        }
        this.send()
    }
    
    forgotPassword(req, forgotPasswordId) {
        this.mailOptions = {
            from: parameter.mailsend.user,
            to: req.body.email,
            subject: "Forgot password - make new",
            html: `
                <h1>Forgot password - make new</h1>
                <a href="${parameter.mailsend.url}forgot.html?id=${forgotPasswordId}">Verification</a>
                `
        }
        this.send()
    }

    send() {
        this.transporter.sendMail(this.mailOptions, (err) => {
            if (err) throw err
        })
    }
}

module.exports = Mailsend