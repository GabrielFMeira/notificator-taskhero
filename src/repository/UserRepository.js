import seq from '../db.js';

export default class UserRepository {
    async findUserToNotificateByStatus(status) {
        const results = await seq.query(
            `
            select u.*
            from usuarios u
            inner join metas m on u.id = m.usuario_id
            where m.status in (:status)
            `,
            {
                replacements: {status: status},
                type: seq.QueryTypes.SELECT
            }
        );

        console.log(results);

        return results;
    }
}