require('dotenv').config()
const nodemailer = require('nodemailer');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.send = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else if (req.method === 'POST') {
        const transporter = nodemailer.createTransport({
            port: process.env.SMTP_PORT,
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            secure: true,
        });

        const {firstName, lastName, email, subject, message, skills, profile} = req.body;

        const mailData = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: subject,
            html: '<body>' +
                '   <h1>Hey!</h1>' +
                '   <p>Someone just sent a message using the ADX website\'s contact form. Below are the details.</p>\n' +
                '   <div>' +
                '       <p><span>Name:</span> ' + firstName + ' ' + lastName + '</p>' +
                '       <p><span>Email:</span> ' + email + '</p>' +
                '   </div>' +
                '   <div>' +
                '       <p><span>Subject: </span> ' + subject + '</p>' +
                '       <p><span>Skills: </span> ' + skills + '</p>' +
                '       <p><span>Public profile: </span> ' + profile + '</p>' +
                '       <p><span>Message: </span>' + message + '</p>' +
                '   </div>' +
                '</body>',
            replyTo: email
        };

        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                console.log(error);
                return "Something went wrong";
            }
            res.status(200).send({message: "Mail sent", message_id: info.messageId});
        });
    } else {
        console.log("Unsupported method");
        return "Unsupported method";
    }

};
