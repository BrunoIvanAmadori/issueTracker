import { getScore } from "../utils/getScore";
import { weightTable } from "../utils/weightTable";
import { getDateDiffInDays } from "../utils/getDateDiffInDays";

export class Issue {
  constructor(params) {
    this.title = params.title;
    this.number = params.number;
    this.relative_date_created = params.relative_date_created;
    this.opener = { name: params.opener.name, avatarUrl: params.opener.avatarUrl };
    this.labels = params.labels;
    this.score = params.score;
  }
}

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

      const sortedData = this.issueSerializer.sortByScore(deserializedData);

      return sortedData.map((data) => new Issue(data));
    } catch (e) {
      console.error(e);
    }
  }
}

export class IssuesSerializer {
  sortByScore(data) {
    let temp = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j + 1 < data.length; j++) {
        if (data[i].score > data[j].score) {
          temp = data[i];
          data[i] = data[j];
          data[j] = temp;
        }
      }
    }
    return data;
  }

  deSerialize(data) {
    const relativeDateCreated = getDateDiffInDays(
      new Date(data.created_at),
      new Date() // current date
    );

    const labels = [...data.labels].map((label) => {
      return {
        name: label.name,
        color: label.color,
        description: label.description,
        url: label.url,
      };
    });

    

    const score = getScore(getWeightTable(), labels, new Date(data.created_at));

    return {
      title: data.title,
      number: data.number,
      relative_date_created: relativeDateCreated,
      opener: { name: data.user.login, avatarUrl: data.user.avatar_url },
      labels: labels,
      score: score,
    };
  }
}
