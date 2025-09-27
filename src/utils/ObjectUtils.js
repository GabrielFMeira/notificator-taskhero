export default class ObjectUtils {
    static getEmailsFromUsers(usersToNotificate) {
        if (!Array.isArray(usersToNotificate)) {
            return [usersToNotificate.email];
        }

        let emails = [];

        for (user of usersToNotificate) {
            emails.concat(user.email);
        }
        return emails;
    }
}