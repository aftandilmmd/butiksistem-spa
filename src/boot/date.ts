import dayjs from 'dayjs';
import tr from 'dayjs/locale/tr'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)

dayjs.tz.setDefault('Europe/Istanbul')

dayjs.locale({ ...tr, weekStart: 1 });

export { dayjs };
