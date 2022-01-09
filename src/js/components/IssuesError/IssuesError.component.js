import IssueErrorTemplate from "./IssueError.template.njk";
import { linkTo } from "../../utils/linkTo";

export class IssuesErrorComponent {
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
    if (this.store.getState().filteredIssues.length == 0) {
      this.issues = IssueErrorTemplate();
      this.$el.innerHTML = this.issues;
      this.$el.querySelector("[data-action='remove-filters']").addEventListener("click", (ev) => {
        linkTo("/");
      });
    }
  }
}
