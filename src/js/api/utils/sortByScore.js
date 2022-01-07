/**
 * Function to sort Issue object from bigger to smaller score
 * @param {Issue} data
 * @returns {Issue}
 */

export function sortByScore(data) {
  let temp = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j + 1 < data.length; j++) {
      if (data[i].score > data[j].score) {
        temp = data[i];
        data[i] = data[j];
        data[j] = temp;
      }
    }
  }
  return data;
}
