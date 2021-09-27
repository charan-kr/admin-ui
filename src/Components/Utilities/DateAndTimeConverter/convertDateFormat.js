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
export const convertDateToString = (value, format = "yyyy-MM-dd") => {
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
      case "yyyy-MM-dd":
        return `${year}-${month}-${date}`;
      case "dd-MM-yyyy":
        return `${date}-${month}-${year}`;
      case "yyyy-MM-dd HH:mm:ss":
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
      case "yyyy-MM-dd HH:mm":
        return `${year}-${month}-${date} ${hours}:${minutes}`;
      case "yyyy-MM-dd HH:mm a":
        return `${year}-${month}-${date} ${hour_12}:${minutes} ${period}`;
      case "dd-MM-yyyy HH:mm A":
        return `${date}-${month}-${year} ${hour_12}:${minutes} ${period.toUpperCase()}`;
      case "dd-MM-yyyy HH:mm a":
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

export const convertStringToDate = (value, format = "yyyy-MM-dd") => {
  try {
    switch (format) {
      case "dd-MM-yyyy hh:mm a":
        const date = value.slice(0, 2);
        const month = value.slice(3, 5);
        const year = value.slice(6, 10);
        const hour = value.slice(11, 13);
        const minute = value.slice(14, 17);
        const period = value.slice(17, 19);
        return new Date(`${year}-${month}-${date} ${hour}:${minute} ${period}`);
      default:
        return null;
    }
  } catch (error) {
    return null;
  }
};
