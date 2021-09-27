const getMonthFromDate = (date) => {
  const month = date.getMonth();
  switch (month) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return null;
  }
};
const getDayFromDate = (date) => {
  // const date = new Date("2021-03-31");
  const day = date.getDay();
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";

    default:
      return null;
  }
};
export const convertDateToString = (value, format = "yyyy-mm-dd") => {
  try {
    const date = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
    const month =
      value.getMonth() < 10
        ? "0" + (value.getMonth() + 1)
        : value.getMonth() + 1;
    const year = value.getFullYear();
    const hours =
      value.getHours() < 10 ? "0" + value.getHours() : value.getHours();
    var hour_12 = value.getHours() % 12;
    hour_12 = hour_12 === 0 ? "12" : hour_12 < 10 ? "0" + hour_12 : hour_12;

    const period = value.getHours() / 12 >= 1 ? "pm" : "am";
    const minutes =
      value.getMinutes() < 10 ? "0" + value.getMinutes() : value.getMinutes();
    const seconds =
      value.getSeconds() < 10 ? "0" + value.getSeconds() : value.getSeconds();

    switch (format) {
      case "yyyy-mm-dd":
        return `${year}-${month}-${date}`;
      case "dd-mm-yyyy":
        return `${date}-${month}-${year}`;
      case "yyyy-mm-dd HH:MM:ss":
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
      case "yyyy-mm-dd HH:MM":
        return `${year}-${month}-${date} ${hours}:${minutes}`;
      case "yyyy-mm-dd HH:MM a":
        return `${year}-${month}-${date} ${hour_12}:${minutes} ${period}`;
      case "dd-mm-yyyy HH:MM A":
        return `${date}-${month}-${year} ${hour_12}:${minutes} ${period.toUpperCase()}`;
      case "dd-mm-yyyy HH:MM a":
        return `${date}-${month}-${year} ${hour_12}:${minutes} ${period}`;
      case "M dd, yyyy":
        return `${getMonthFromDate(value)} ${date}, ${year}`;

      case "B M dd":
        return `${getDayFromDate(value)}, ${getMonthFromDate(value)} ${date}`;
      default:
        return `${year}-${month}-${date}`;
    }
  } catch (error) {
    return null;
  }
};
