import cron from 'node-cron';
import CronConstants from '../constants/CronConstants.js';
import NotificationService from '../services/NotificationService.js';
import MetaService from '../services/MetaService.js';

cron.schedule(CronConstants.ONCE_PER_WEEK, () => NotificationService.notifyUsersNotFinished);
cron.schedule(CronConstants.ONCE_PER_WEEK, () => NotificationService.notifyUsersExpired);
cron.schedule(CronConstants.EVERY_FIVE_MINUTES, () => MetaService.expireMetas);