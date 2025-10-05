import UserRepository from "../repository/UserRepository";
import ObjectUtils from "../utils/ObjectUtils";
import EmailService from "./EmailService";
import fs from 'fs';
import path from 'path';

const repository = new UserRepository();
const emailService = new EmailService();

export default class NotificationService {
    static async notifyUsersNotFinished() {
        const usersToNotificate = repository.findUserToNotificateByStatus([
            'PENDENTE', 
            'BLOQUEADO', 
            'EM_ANDAMENTO'
        ]);

        this.notify(usersToNotificate, 'TarefaPendenteTemplate.html');
    }

    static async notifyUsersExpired() {
        const usersToNotificate = repository.findUserToNotificateByStatus([
            'EXPIRADO'
        ]);

        this.notify(usersToNotificate, 'TarefaPendenteTemplate.html');

        usersToNotificate.forEach(user => {
            repository.markUserExpiredMetasAsNotified(user.id);
        });
    }

    static notify(usersToNotificate, template) {
        if (!usersToNotificate) return;

        let emailsToNotificate = ObjectUtils.getEmailsFromUsers(usersToNotificate);

        emailsToNotificate.forEach(email => {
            const __dirname = path.resolve();

            const templatePath = path.join(__dirname, 'assets', 'templates', template);
            const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

            emailService.sendMail(
                email,
                'Existem tarefas não concluídas.',
                htmlTemplate
            );
        });
    }
}