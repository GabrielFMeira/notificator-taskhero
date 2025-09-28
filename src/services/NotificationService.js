import UserRepository from "../repository/UserRepository";
import ObjectUtils from "../utils/ObjectUtils";
import EmailService from "./EmailService";
import fs from 'fs';
import path from 'path';

const repository = new UserRepository();
const emailService = new EmailService();

export default class NotificationService {
    static async notificateUsersNotFinished() {
        const usersToNotificate = repository.findUserToNotificateByStatus([
            'PENDENTE', 
            'BLOQUEADO', 
            'EM_ANDAMENTO'
        ]);

        if (!usersToNotificate) return;

        let emailsToNotificate = ObjectUtils.getEmailsFromUsers(usersToNotificate);

        emailsToNotificate.forEach(email => {
            const __dirname = path.resolve();

            const templatePath = path.join(__dirname, '..', 'assets', 'templates', 'TarefaPendenteTemplate.html');
            const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

            emailService.sendMail(
                email,
                'Existem tarefas não concluídas.',
                htmlTemplate
            );
        });
    }
}