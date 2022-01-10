/**
 * Get only the business days from normal days
 * @param {Date} startDate Date to start counting
 * @param {Date} endDate Date to finish counting
 * @returns number
 */

export function countBusinessDays(startDate, endDate) {
  let count = 0;

  let curDate = startDate;

  while (curDate.getTime() <= endDate.getTime()) {
    let nextDate = new Date(curDate);
    nextDate.setDate(curDate.getDate() + 1);

    if (nextDate.getDay() == 0 || nextDate.getDay() == 6 || startDate.getDate() == endDate.getDate()) {
      curDate.setDate(curDate.getDate() + 1);
    } else if (curDate.getDate() != endDate.getDate() || (curDate.getDay() !== 0 && curDate.getDay() !== 6)) {
      count++;
      curDate.setDate(curDate.getDate() + 1);
    } else {
      curDate.setDate(curDate.getDate() + 1);
    }
  }

  return count;
}
