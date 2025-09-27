import seq from '../db.js';

export default class UserRepository {
    async findUserToNotificateByStatus(status) {
        const [results, metadata] = await seq.query(
            `
            select u.*
            from usuarios u
            inner join metas m on u.id = m.usuario_id
            where m.status in (:status)
            `,
            {
                replacements: {status},
                type: seq.QueryTypes.SELECT
            }
        );

        return results;
    }
}