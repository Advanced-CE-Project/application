import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatShortKoreanDateTime = (isoString: string) => {
  try {
    const date = new Date(isoString);
    return format(date, 'M월 d일 (EEE) a h시', { locale: ko });
  } catch (error) {
    return '';
  }
};