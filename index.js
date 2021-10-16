require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const route = express.Router();
app.use('/', route);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    secure: true,
});

route.post('/send', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');


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
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            console.log(error);
            return "Something went wrong";
        }
        res.status(200).send({message: "Mail sent", message_id: info.messageId});
    });
});