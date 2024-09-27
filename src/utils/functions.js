function returnNewDateFormat (date) {
  const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
  const year = date.getFullYear();
  const newDate = year + '-' + month;
  return newDate;
}

function returnDateTimeFormat (date) {
  const day = (date.getDate() < 9 ? '0' : '') + date.getDate();
  const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = (date.getHours() < 9 ? '0' : '') + date.getHours();
  const minutes = (date.getMinutes() < 9 ? '0' : '') + date.getMinutes();
  const newDate = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
  return newDate;
}

const getAllDaysInMonth = (month, year) =>
  Array.from(
    { length: new Date(year, month + 1, 0).getDate() },
    (_, i) => new Date(year, month, i + 1)
  );

function getUID() {
  return Date.now().toString(36);
}

export { returnNewDateFormat, getUID, getAllDaysInMonth, returnDateTimeFormat }
