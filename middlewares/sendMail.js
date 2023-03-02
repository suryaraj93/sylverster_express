const nodemailer = require('nodemailer');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_MAIL_PASSWORD = process.env.ADMIN_MAIL_PASSWORD



const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: ADMIN_EMAIL,
        pass: ADMIN_MAIL_PASSWORD,
    },
    secure: true,
});



const mailData = (to_mail) => {
    const a = {
        from: ADMIN_EMAIL,  // sender address
        to: to_mail,   // list of receivers
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };
    return a
}

const reviewMailData = (to_mail) => {
    const a = {
        from: ADMIN_EMAIL,  // sender address
        to: to_mail,   // list of receivers
        subject: 'Sending Email using Node.js',
        text: 'Your review is marked',
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };
    return a
}


module.exports = {
    transporter, mailData, reviewMailData
}
