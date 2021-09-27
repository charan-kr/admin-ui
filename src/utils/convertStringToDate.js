export const convertStringToDate = (string, format = "yyyy-dd-yyyy") => {
  switch (format) {
    case "dd-mm-yyyy HH:MM A":
      const date = string.slice(0, 2);
      const month = string.slice(3, 5);
      const year = string.slice(6, 10);
      const hour = string.slice(11, 13);
      const minute = string.slice(14, 16);
      const period = string.slice(17, 19);
      return new Date(`${year}-${month}-${date} ${hour}:${minute} ${period}`);
    default:
      return new Date();
  }
};
