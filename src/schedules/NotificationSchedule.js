import cron from 'node-cron';
import CronConstants from '../constants/CronConstants.js';
import NotificationService from '../services/NotificationService.js';
import MetaService from '../services/MetaService.js';

cron.schedule(CronConstants.ONCE_PER_WEEK, async () => {
    console.log('[CRON] Verificando usuário com metas não expiradas');
    await NotificationService.notifyUsersNotFinished();
});

cron.schedule(CronConstants.ONCE_PER_WEEK, async () => {
    console.log('[CRON] Verificando usuários com metas expiradas');
    await NotificationService.notifyUsersExpired()
});

cron.schedule(CronConstants.EVERY_FIVE_MINUTES, async () => {
    console.log('[CRON] Verificando metas expiradas');
    await MetaService.expireMetas();
});