/**
 * Function that does the calculation to get the priority score for the issue
 * @param {[Object]} weightTable
 * @param {[Object]} labels
 * @param {number} totalBusinessDays
 * @returns {number} Priority score
 */

export function getScore(weightTable, labels, totalBusinessDays) {
  let weightScore;

  // look if there are matches between the labels and the weight table, and then assign the value
  for (let i = 0; i < labels.length; i++) {
    weightTable.forEach((weight) => {
      if (weight.name == labels[i].name && weightScore === undefined) {
        weightScore = weight.value;
      }
    });
  }

  // if weight never was defined because there were no matches then default to 0
  if (weightScore == undefined) {
    weightScore = 0;
  }

  return weightScore * totalBusinessDays;
}
