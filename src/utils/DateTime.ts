import { dayjs } from 'boot/date';

function getFormattedDate(date: string) {
    return dayjs(date).format('DD MMMM YYYY, ddd, HH:mm:ss')
}

export {
  getFormattedDate
};
