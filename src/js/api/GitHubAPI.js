import { Octokit } from "@octokit/core";
import { IssuesController, IssuesSerializer } from "./Issues";
import { MembersController, MembersSerializer } from "./Members";

/**
 * The main class for the GitHub API.
 */
export class GitHubAPI {
  constructor(config) {
    this.octokit = new Octokit({
      auth: config.token,
    });

    this.IssuesController = new IssuesController(this.octokit, new IssuesSerializer(), config);
    this.MembersController = new MembersController(this.octokit, new MembersSerializer(), config);
  }
}
