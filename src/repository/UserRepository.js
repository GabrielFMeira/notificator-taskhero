import seq from '../db.js';

export default class UserRepository {
    async findUserToNotificateByStatus(status) {
        const results = await seq.query(
            `
            select u.*
            from usuarios u
            inner join metas m on u.id = m.usuario_id
            where m.status in (:status)
            and m.notificado_expiracao is false
            `,
            {
                replacements: {status: status},
                type: seq.QueryTypes.SELECT
            }
        );

        return results;
    }

    async markUserExpiredMetasAsNotified(userId) {
        await seq.query(
            `
            update metas m
            set notificado_expiracao = true
            where m.usuario_id = :userId
            `,
            {
                replacements: {userId: userId},
                type: seq.QueryTypes.UPDATE
            }
        );
    }
}