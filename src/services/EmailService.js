import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, 
    secure: false,
    auth: {
        user: "seuemail@provedor.com",
        pass: ""
    },
})

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
            from: '"Taskhero" <seuemail@provedor.com>',
            to: destinyAdress,
            subject: subject,
            html: template
        }
    }
}