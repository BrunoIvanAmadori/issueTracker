/**
 * Get only the business days from normal days
 * @param {Date} startDate Date to start counting
 * @param {Date} endDate Date to finish counting
 * @returns number
 */

export function countBusinessDays(startDate, endDate) {
  let count = 0;
  const curDate = new Date(startDate.getTime());

  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
    curDate.setDate(curDate.getDate() + 1);
  }

  return count;
}
