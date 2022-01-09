import { filterIssuesByUrl } from "../utils/filterIssuesByUrl";
import { sortIssues } from "../utils/sortIssues";
import { updateScore } from "../api/utils/updateScore";
import { Member } from "../api/Members";

export function reducers(state, action) {
  switch (action.type) {
    case "CREATE_ISSUES":
      return { ...state, issues: action.payload };

    case "FILTER_ISSUES":
      /**
       * We filter the issues in our state, first updating the score, sorting in ASC and finally filtering by URL
       * @returns updated state.
       */

      const filteredIssues = () => {
        let scoredIssues = updateScore(state.issues, state.weightTable);
        let sortedIssues = sortIssues(scoredIssues);
        return filterIssuesByUrl(sortedIssues, action.payload);
      };

      return { ...state, filteredIssues: filteredIssues() };

    case "UPDATE_ISSUES_SCORE":
      /**
       * We only update the score and sort the issues. This is mainly for the save new weight table function.
       * @returns updated state.
       */

      const updatedIssues = () => {
        let scoredIssues = updateScore(state.issues, action.payload);
        return sortIssues(scoredIssues);
      };

      return { ...state, filteredIssues: updatedIssues() };

    case "CREATE_MEMBERS":
      /**
       * We insert retrieved members in our state, check if there are more in our issues and, if not, add them.
       * @returns updated state.
       */

      const createdMembers = () => {
        let membersRetrieved = action.payload;

        state.issues.map((issue) => {
          if (!membersRetrieved.find((member) => member.name == issue.opener.name)) {
            membersRetrieved.push(new Member({ name: issue.opener.name, avatarUrl: issue.opener.avatarUrl }));
          }
        });

        return membersRetrieved;
      };

      return { ...state, members: createdMembers() };

    case "RESET_WEIGHT_TABLE":
      /**
       * We reset the weight table to default values. This is mainly for the save new weight table function.
       * @returns updated state.
       */

      const resetedIssues = () => {
        let scoredIssues = updateScore(state.issues, action.payload);

        return sortIssues(scoredIssues);
      };

      return { ...state, filteredIssues: resetedIssues() };

    default:
      return state;
  }
}
