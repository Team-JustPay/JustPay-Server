const dateParser = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month =
    inputDate.getMonth() + 1 < 10 ? '0' + (inputDate.getMonth() + 1) : inputDate.getMonth() + 1;
  const date = inputDate.getDate() < 10 ? '0' + inputDate.getDate() : inputDate.getDate();
  const weekdayMatch = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdayMatch[inputDate.getDay()];
  const parsedDate = year + '.' + month + '.' + date + ' ' + '(' + weekday + ')';
  return parsedDate;
};

export default dateParser;
