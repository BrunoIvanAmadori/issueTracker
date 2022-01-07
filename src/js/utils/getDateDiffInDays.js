export function getDateDiffInDays(a, b) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  let date1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  let date2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((date2 - date1) / MS_PER_DAY);
}
