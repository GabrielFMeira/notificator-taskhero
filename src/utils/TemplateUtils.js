import ObjectUtils from "./ObjectUtils.js";

export default class TemplateUtils {
    static preencherTemplate(template, data) {
        return template.replace(/{{(.*?)}}/g, (match, chave) => {
            const key = chave.trim();
            return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : match;
        });
    }

    static buildTemplateData(user) {
        return {
            USER_NAME: user.nome_usuario,
            GOAL_TITLE: user.nome_meta,
            GOAL_DESCRIPTION: user.descricao_meta,
            COMPLETED_TASKS: user.completed_tasks,
            TOTAL_TASKS: user.total_tasks,
            PROGRESS_PERCENT: user.progress_percent,
            END_DATE: ObjectUtils.formateDate(user.data_fim),
            DAYS_EXPIRED: `${user.dias_expirados} dias`,
            DAYS_REMAINING: `${user.tempo_restante} dias`
        }
    }
}