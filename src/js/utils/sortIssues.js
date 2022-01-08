/**
 * Function to sort Issue object from bigger to smaller score
 * @param {Issue} data
 * @returns {Issue}
 */

export function sortIssues(els) {
  let temp = [];

  for (let i = 0; i < els.length; i++) {
    for (let j = 0; j + 1 < els.length; j++) {
      if (els[i].score > els[j].score) {
        temp = els[i];
        els[i] = els[j];
        els[j] = temp;
      }
    }
  }

  return els;
}
