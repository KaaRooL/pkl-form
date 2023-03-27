import nodemailer from 'nodemailer';

async function sendEmail(html:any) {
    const receiveEmailAddress = process.env.RECEIVE_EMAIL;

    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;
    const host = process.env.MAIL_HOST;
    const port = Number(process.env.MAIL_PORT);
    const secure = Boolean(process.env.MAIL_IS_SECURE);
 
    try{
        let transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: secure,
            auth: {
                user: user,
                pass: pass
            }
        });

        let mailOptions = createMessage(html, user, receiveEmailAddress);

        let info = await transporter.sendMail(mailOptions);

        console.log(`Email sent: ${info.response}`);
    }
    catch(err){
        
        console.log(`There was a problem with mail service. Error: ${err}`)
        throw new Error(`There was a problem with mail service. Error: ${err}`)
    }
}

function createMessage(html: any, user: string | undefined, receiveEmailAddress: string | undefined) {
    const lead = `Nazwa placówki: ${html.company},<br>Imię i nazwisko: ${html.name},<br>Email: ${html.email},<br>Numer telefonu: ${html.phone}`;


    // Define the email options
    let mailOptions = {
        from: `Solina kampania szkolna <${user}>`,
        to: receiveEmailAddress,
        subject: "Solina - nowy formularz z kampanii",
        text: `${lead}`,
        html: `<b>${lead}</b>`
    };
    return mailOptions;
}



export default sendEmail;




