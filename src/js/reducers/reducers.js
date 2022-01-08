import { filterIssuesByUrl } from "../utils/filterIssuesByUrl";
import { sortIssues } from "../utils/sortIssues";
import { updateScore } from "../api/utils/updateScore";
import { Member } from "../api/Members";

export default (state, action) => {
  switch (action.type) {
    case "CREATE_ISSUES":
      const createdIssues = () => {
        let scoredIssues = updateScore(action.payload, state.weightTable);
        return sortIssues(scoredIssues);
      };

      return { ...state, issues: createdIssues() };

    case "UPDATE_ISSUES_SCORE":
      const updatedIssues = () => {
        let scoredIssues = updateScore(state.issues, action.payload);
        return sortIssues(scoredIssues);
      };

      return { ...state, filteredIssues: updatedIssues() };

    case "FILTER_ISSUES":
      const filteredIssues = () => {
        let scoredIssues = updateScore(state.issues, state.weightTable);
        let sortedIssues = sortIssues(scoredIssues);
        return filterIssuesByUrl(sortedIssues, action.payload);
      };

      return { ...state, filteredIssues: filteredIssues() };

    case "CREATE_MEMBERS":
      const createdMembers = () => {
        let membersRetrieved = action.payload;
        // We check if members retrieved by API include users retrieved in issues. If not, add them.
        state.issues.map((issue) => {
          if (!membersRetrieved.find((member) => member.name == issue.opener.name)) {
            membersRetrieved.push(new Member({ name: issue.opener.name, avatarUrl: issue.opener.avatarUrl }));
          }
        });

        return membersRetrieved;
      };

      return { ...state, members: createdMembers() };

    default:
      return state;
      break;
  }
};
