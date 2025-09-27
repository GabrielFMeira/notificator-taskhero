import cron from 'node-cron';
import CronConstants from '../constants/CronConstants';
import NotificationService from '../services/NotificationService';

cron.schedule(CronConstants.ONCE_PER_WEEK, () => NotificationService.notificateUsers)