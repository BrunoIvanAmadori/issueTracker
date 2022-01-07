/**
 * Function to sort Issue object from bigger to smaller score
 * @param {Issue} data
 * @returns {Issue}
 */

export function sortByDate(data) {
  let temp = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j + 1 < data.length; j++) {
      if (data[i].created_at > data[j].created_at) {
        temp = data[i];
        data[i] = data[j];
        data[j] = temp;
      }
    }
  }
  return data;
}
