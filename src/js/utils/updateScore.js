import { countBusinessDays } from "./countBusinessDays";
import { getScore } from "./getScore";

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
