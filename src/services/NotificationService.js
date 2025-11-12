import UserRepository from "../repository/UserRepository.js";
import TemplateUtils from "../utils/TemplateUtils.js";
import EmailService from "./EmailService.js";
import fs from 'fs';
import path from 'path';

const repository = new UserRepository();
const emailService = new EmailService();

export default class NotificationService {
    static async notifyUsersNotFinished() {
        const usersToNotificate = await repository.findUserToNotificateByStatus([
            'PENDENTE', 
            'BLOQUEADO', 
            'EM_ANDAMENTO'
        ]);

        this.notify(usersToNotificate, 'email-meta-expirando.html');
    }

    static async notifyUsersExpired() {
        const usersToNotificate = await repository.findUserToNotificateByStatus([
            'EXPIRADO'
        ]);

        this.notify(usersToNotificate, 'email-meta-expirada.html');

        usersToNotificate.forEach(user => {
            repository.markUserExpiredMetasAsNotified(user.usuario_id);
        });
    }

    static notify(usersToNotificate, template) {
        if (!usersToNotificate) return;

        const __dirname = path.resolve();
        const templatePath = path.join(__dirname, 'assets', 'templates', template);
        const originalHtmlTemplate = fs.readFileSync(templatePath, 'utf-8');

        usersToNotificate.forEach(user => {
            let email = user.email;

            const userTemplateData = TemplateUtils.buildTemplateData(user);
            const htmlTemplate = TemplateUtils.preencherTemplate(originalHtmlTemplate, userTemplateData);

            emailService.sendMail(
                email,
                'Existem tarefas não concluídas.',
                htmlTemplate
            );
        });
    }
}