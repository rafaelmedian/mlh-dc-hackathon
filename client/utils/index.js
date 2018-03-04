import moment from 'moment';

export const ymdToDate = (event) => {
  const time = moment(event.start_date).format("MMM Do");
  return time + ' ' + event.start_time + ' - ' + event.end_time;
};
