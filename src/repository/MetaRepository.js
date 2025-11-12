import seq from "../db.js";

export default class MetaRepository {
    async markMetasAsExpired() {
        await seq.query(
            `
            update metas m
            set status = 'EXPIRADO'::enum_metas_status
            where m.data_fim < current_timestamp
            and status <> 'EXPIRADO'
            `, {
                type: seq.QueryTypes.UPDATE
            }
        )
    }
}