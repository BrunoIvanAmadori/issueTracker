import { GitHubAPI } from "./api/GitHubAPI";
import { router } from "./routes";
import { Home } from "./pages/Home";
import "./styles/style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

function initAPI() {
  const config = {
    token: "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",
    repo: "rotundasoftware",
    project: "rotunda-qa-demo",
    org: "rotundasoftware",
  };
  return new GitHubAPI(config);
}

window.addEventListener("load", async () => {
  const API = initAPI();

  const issuesData = await API.IssuesController.getAllIssues();
  const membersData = await API.MembersController.getAllMembers();

  const state = {
    issuesData,
    membersData,
  };

  router(API);
});
