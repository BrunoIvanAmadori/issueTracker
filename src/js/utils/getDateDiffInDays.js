/**
 * Get difference in number between two dates
 * @param {*} startDate
 * @param {*} endDate
 * @returns number
 */

export function getDateDiffInDays(startDate, endDate) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  let date1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  let date2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  return Math.floor((date2 - date1) / MS_PER_DAY);
}
