export const convertDateTime = (date?: Date) => {
  if (date) {
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
  }
  return '';
};
export const convertDateTimeDetail = (date?: Date) => {
  if (date) {
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    let hours = date.getHours().toString();
    hours = hours.length > 1 ? hours : '0' + hours;
    let minutes = date.getMinutes().toString();
    minutes = minutes.length > 1 ? minutes : '0' + minutes;
    let seconds = date.getSeconds().toString();
    seconds = seconds.length > 1 ? seconds : '0' + seconds;

    return (
      day +
      '/' +
      month +
      '/' +
      year +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds
    );
  }
  return '';
};
export const toISOLocalString = (date: Date) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(date.getTime() - tzoffset).toISOString();

  return localISOTime;
};
