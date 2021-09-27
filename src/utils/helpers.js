export const futureDay = (days = 0, date = new Date()) => {
  var myCurrentDate = date;
  var myFutureDate = new Date(myCurrentDate);
  myFutureDate.setDate(myFutureDate.getDate() + days);

  return myFutureDate;
};

export default futureDay;
