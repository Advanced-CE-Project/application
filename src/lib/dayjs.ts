import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');

export const formatShortKoreanDateTime = (isoString: string | Date) => {
  return dayjs(isoString).format('M월 d일 (ddd) A h시');
};

export default dayjs;
