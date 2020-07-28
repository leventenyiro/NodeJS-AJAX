class Mailsend {
    constructor(req) {
        var nodemailer = require("nodemailer")
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "trophien.noreply@gmail.com",
                pass: ""
            }
        })
        this.url = "http://localhost/nodejs/email.html?id="
        this.req = req;
    }

    verification(emailVerificationId) {
        this.mailOptions = {
            from: "trophien.noreply@gmail.com",
            to: this.req.body.email,
            subject: "Email verification",
            html: `
                <h1>Verificate your E-mail address</h1>
                <a href="${this.url}${emailVerificationId}">Verification</a>
                `
        }
        this.send()
    }
    
    forgotPassword(forgotPasswordId) {
        this.mailOptions = {
            from: "trophien.noreply@gmail.com",
            to: this.req.body.email,
            subject: "Email verification",
            html: `
                <h1>Verificate your E-mail address</h1>
                <a href="${this.url}${forgotPasswordId}">Verification</a>
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