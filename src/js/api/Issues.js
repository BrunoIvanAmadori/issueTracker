import { getScore } from "./utils/getScore";
import { getWeightTable } from "./utils/getWeightTable";
import { getDateDiffInDays } from "./utils/getDateDiffInDays";
import { countBusinessDays } from "./utils/countBusinessDays";
import { sortAsc } from "./utils/sortAsc";

/**
 * Model for the Issue object
 */
export class Issue {
  constructor(params) {
    this.title = params.title;
    this.number = params.number;
    this.relative_date_created = params.relative_date_created;
    this.opener = { name: params.opener.name, avatarUrl: params.opener.avatarUrl };
    this.labels = params.labels;
    this.score = params.score;
    this.created_at = params.created_at;
  }
}

/**
 * Main class for fetching the Issue data from Github and delivering it to the app
 */

export class IssuesController {
  constructor(octokit, issueSerializer, config) {
    this.octokit = octokit;
    this.issueSerializer = issueSerializer;
    this.token = config.token;
    this.repo = config.repo;
    this.project = config.project;
  }

  async getAllIssues() {
    try {
      console.log("fetching posta");
      const response = await this.octokit.request("GET /repos/{repo}/{project}/issues", {
        headers: {
          Authorization: `Token ${this.token}`,
        },
        repo: this.repo,
        project: this.project,
      });

      const deserializedData = response.data.map((issue) => {
        return this.issueSerializer.deSerialize(issue);
      });

      let sortedData = sortAsc(deserializedData, ["score", "created_at"]);

      return sortedData.map((data) => new Issue(data));
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * Class that reformats the data to consume it properly
 */

export class IssuesSerializer {
  deSerialize(data) {
    const today = new Date();
    const creationDate = new Date(data.created_at);
    const relativeDateCreated = getDateDiffInDays(creationDate, today);

    const labels = [...data.labels].map((label) => {
      return {
        name: label.name,
        color: label.color,
      };
    });

    return {
      title: data.title,
      number: data.number,
      relative_date_created: relativeDateCreated,
      opener: { name: data.user.login, avatarUrl: data.user.avatar_url },
      labels: labels,
      created_at: data.created_at,
    };
  }
}
