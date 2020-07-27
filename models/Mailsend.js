class Mailsend {
    constructor(req, emailVerificationId) {
        var nodemailer = require("nodemailer")

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "trophien.noreply@gmail.com",
                pass: ""
            }
        })

        var url = "http://localhost/nodejs/email.html?id="
        
        var mailOptions = {
            from: "trophien.noreply@gmail.com",
            to: req.body.email,
            subject: "Email verification",
            html: `
                <h1>Verificate your E-mail address</h1>
                <a href="${url}${emailVerificationId}">Verification</a>
                `
        }

        transporter.sendMail(mailOptions, (err) => {
            if (err) throw err
        })
    }
}

module.exports = Mailsend