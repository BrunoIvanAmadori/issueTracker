import { Issue } from "../templates/Issue";
import { Menu } from "../templates/Menu";
import { IssueError } from "../templates/IssueError";
import { CustomizeModal } from "../templates/CustomizeModal";
import { weightTable } from "../utils/weightTable";

export const Home = async (API) => {
  console.log("fetching");
  const issuesData = await API.IssuesController.getAllIssues();

  const issues = issuesData.map((issue) => Issue(issue)).join(" ");

  const membersData = await API.MembersController.getAllMembers();

  const menu = await Menu(membersData);

  const modal = await CustomizeModal(weightTable);

  const error = await IssueError();

  return { menu, issues, error, modal };
};
