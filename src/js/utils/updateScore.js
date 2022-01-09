import { countBusinessDays } from "./countBusinessDays";
import { getScore } from "./getScore";

/**
 * Function that updates the scores to an array of issues
 * @param {*} issues 
 * @param {*} weightTable 
 * @returns 
 */
export function updateScore(issues, weightTable) {
  const today = new Date();

  return issues.map((issue) => {
    const creationDate = new Date(issue.created_at);
    const totalBusinessDays = countBusinessDays(creationDate, today);
    const score = getScore(weightTable, issue.labels, totalBusinessDays);
    issue.score = score;
    return issue;
  });
}
