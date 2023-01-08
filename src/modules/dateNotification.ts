const dateParserInNotification = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month =
    inputDate.getMonth() + 1 < 10 ? '0' + (inputDate.getMonth() + 1) : inputDate.getMonth() + 1;
  const date = inputDate.getDate() < 10 ? '0' + inputDate.getDate() : inputDate.getDate();
  const hour = ('0' + inputDate.getHours()).slice(-2);
  const minute = ('0' + inputDate.getSeconds()).slice(-2);
  const parsedDate = year + '.' + month + '.' + date + ' ' + hour + ':' + minute;
  return parsedDate;
};

export default dateParserInNotification;
