import seq from '../db.js';

export default class UserRepository {
    async findUserToNotificateByStatus(status) {
        const results = await seq.query(
            `
            SELECT 
                u.id AS usuario_id,
                u.nome AS nome_usuario,
                u.email AS email,
                m.id AS meta_id,
                m.titulo AS nome_meta,
                m.descricao AS descricao_meta,
                COUNT(t.id) FILTER (WHERE t.status = 'CONCLUIDO') AS completed_tasks,
                COUNT(t.id) AS total_tasks,
                ROUND(
                    100.0 * COUNT(t.id) FILTER (WHERE t.status = 'CONCLUIDO') / NULLIF(COUNT(t.id), 0),
                    2
                ) AS progress_percent,
                m.data_fim as data_fim,
                GREATEST(0, CURRENT_DATE - m.data_fim::date) as dias_expirados
            FROM usuarios u
            INNER JOIN metas m ON u.id = m.usuario_id
            LEFT JOIN tarefas t ON m.id = t.meta_id
            WHERE m.status IN (:status)
            AND m.notificado_expiracao IS FALSE
            GROUP BY u.id, u.nome, u.email, m.id, m.titulo, m.descricao, m.data_fim
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