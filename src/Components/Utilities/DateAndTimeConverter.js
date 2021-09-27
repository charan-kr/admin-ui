export class DateAndTimeConverter {
  convertDateAndTime(dateObj) {
    let dateObject = new Date(dateObj);
    let day = dateObject.getDate();
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();
    let time = dateObject.toLocaleString().split(",");
    if (day < 10) {
      day = "0".concat(day);
    }
    if (month < 10) {
      month = "0".concat(month);
    }
    let timeConvert = time[1];
    let hours = timeConvert.split(":")[0].trim();
    let minutues = timeConvert.split(":")[1];
    let secounds = timeConvert.split(":")[2];
    let timePeriod = secounds.split(" ");
    if (hours < 10) {
      hours = "0".concat(hours);
    }
    return `${day}-${month}-${year} ${hours}:${minutues} ${timePeriod[1]}`;
  }
  convertDate(dateObj) {
    let dateObject = new Date(dateObj);
    let day = dateObject.getDate();
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();

    if (day < 10) {
      day = "0".concat(day);
    }
    if (month < 10) {
      month = "0".concat(month);
    }

    return `${day}-${month}-${year} `;
  }

  objectToDate(obj) {
    let test = obj.toLocaleString().split("-");
    let finalDate = new Date();
    finalDate.setFullYear(test[2], test[1] - 1, test[0]);

    return finalDate;
  }
}
