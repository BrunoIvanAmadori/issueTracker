/**
 * Function to sort Issue object from bigger to smaller score
 * @param {Issue} data
 * @returns {Issue}
 */

export function sortAsc(els, propToSort) {
  let temp = [];

  propToSort.forEach((prop) => {
    for (let i = 0; i < els.length; i++) {
      for (let j = 0; j + 1 < els.length; j++) {
        if (els[i][prop] > els[j][prop]) {
          temp = els[i];
          els[i] = els[j];
          els[j] = temp;
        }
      }
    }
  });

  return els;
}
