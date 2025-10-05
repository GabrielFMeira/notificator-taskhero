import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, 
    secure: false,
    auth: {
        user: process.env.APP_TASKHERO_EMAIL_ADRESS,
        pass: process.env.APP_TASKHERO_EMAIL_PASSWORD
    },
});

export default class EmailService {
    async sendMail(destinyAdress, subject, template) {
        let mailOptions = this.#createMailOptions(destinyAdress, subject, template);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Erro ao enviar e-mail:", error);
            } else {
                console.log("E-mail enviado:", info.response);
            }
        });
    }

    #createMailOptions(destinyAdress, subject, template) {
        return {
            from: `"Taskhero" ${process.env.APP_TASKHERO_EMAIL_ADRESS}`,
            to: destinyAdress,
            subject: subject,
            html: template
        }
    }
}