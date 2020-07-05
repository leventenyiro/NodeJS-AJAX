class Mailsend {
    constructor(req) {
        var nodemailer = require("nodemailer")

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "trophien.noreply@gmail.com",
                pass:"valami"
            }
        })

        var url = "http://localhost/nodejs/email.html?email="
        
        var mailOptions = {
            from: "trophien.noreply@gmail.com",
            to: req.body.email,
            subject: "Email verification",
            html: `
                <h1>Verificate your E-mail address</h1>
                <a href="${url}${req.body.email}">Verification</a>
                `
        }

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) throw err
        })
    }
}

module.exports = Mailsend