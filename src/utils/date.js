import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat, MINUTES_IN_HOUR } from '../const';

dayjs.extend(duration);

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function humanizeMinutes(minutes, format) {
  return minutes ? dayjs.duration(minutes, 'minutes').format(format) : '';
}

function getCalculateDuration(minutes) {
  switch (true) {
    case minutes < MINUTES_IN_HOUR:
      return humanizeMinutes(minutes, DateFormat.MINUTES);

    case minutes >= MINUTES_IN_HOUR:
      return humanizeMinutes(minutes, DateFormat.HOUR_MINUTES);
  }
}

export {
  humanizeDate,
  getCalculateDuration,
};
