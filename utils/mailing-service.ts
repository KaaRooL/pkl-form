import nodemailer from 'nodemailer';
import { HtmlHTMLAttributes } from 'react';

async function sendEmail(html:any) {

    // Create a transporter object
    let transporter = nodemailer.createTransport({
        host: 'mail56.mydevil.net',
        port: 465,
        secure: true,
        auth: {
            user: 'mailer@ksiwak.usermd.net',
            pass: 'K@rol.1234!'
        }
    });

    const lead = `Nazwa placówki: ${html.company},<br>Imię i nazwisko: ${html.name},<br>Email: ${html.email},<br>Telefon: ${html.phone}`;
         
    
    // Define the email options
    let mailOptions = {
        from: 'Kampania formularz <mailer@ksiwak.usermd.net>',
        to: 'siwakkarol@gmail.com',
        subject: "Kampania nowy wpis",
        text: `${lead}`,
        html: `<b>${lead}</b>`
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);

    console.log(`Email sent: ${info.response}`);
}

export default sendEmail;