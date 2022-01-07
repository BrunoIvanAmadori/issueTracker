import { getBusinessDays } from "./getBusinessDays";

export function getScore(weightTable, labels, issueCreationDate) {
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

  let today = new Date();
  let totalBusinessDays = getBusinessDays(issueCreationDate, today);
  return weightScore * totalBusinessDays;
}
