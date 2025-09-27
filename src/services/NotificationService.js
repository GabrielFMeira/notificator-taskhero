import UserRepository from "../repository/UserRepository";
import ObjectUtils from "../utils/ObjectUtils";
import EmailService from "./EmailService";

const repository = new UserRepository();

export default class NotificationService {
    static async notificateUsersNotFinished() {
        const usersToNotificate = repository.findUserToNotificateByStatus([
            'PENDENTE', 
            'BLOQUEADO', 
            'EM_ANDAMENTO'
        ]);

        if (!usersToNotificate) return;

        let emailsToNotificate = ObjectUtils.getEmailsFromUsers(usersToNotificate);

        //TODO chamar email service aqui
    }


}