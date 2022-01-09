import { IssueTemplate } from "./IssuesTemplate";
import { IssueErrorTemplate } from "../IssuesError/IssueErrorTemplate";
import { linkTo } from "../../utils/linkTo";
export class Issues {
  constructor(options) {
    this.$el = options.el;
    this.store = options.store;
    this.issues;

    this.store.subscribe(() => {
      this.render();
    });

    this.render();
  }

  render() {
    if (this.store.getState().filteredIssues.length != 0) {
      this.issues = this.store
        .getState()
        .filteredIssues.map((issue) => IssueTemplate(issue))
        .join(" ");
      this.$el.innerHTML = this.issues;
    }
  }
}
