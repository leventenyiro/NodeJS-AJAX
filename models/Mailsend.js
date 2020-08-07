var parameter = require("../parameter.json")
class Mailsend {
    constructor(req) {
        var nodemailer = require("nodemailer")
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: parameter.mailsend.user,
                pass: parameter.mailsend.password
            }
        })
        this.req = req;
    }

    verification(emailVerificationId) {
        var email = this.req.body.email
        if (email == undefined) email = this.req.body.usernameEmail
        this.mailOptions = {
            from: parameter.mailsend.user,
            to: email,
            subject: "Email verification",
            html: `
                <h1>Verificate your E-mail address</h1>
                <a href="${parameter.mailsend.url}email.html?id=${emailVerificationId}">Verification</a>
                `
        }
        this.send()
    }
    
    forgotPassword(forgotPasswordId) {
        this.mailOptions = {
            from: parameter.mailsend.user,
            to: this.req.body.email,
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