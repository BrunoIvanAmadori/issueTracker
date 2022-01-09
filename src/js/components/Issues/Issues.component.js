import IssuesTemplate from "./Issues.template.njk";
import { getContrast } from "../../utils/getContrast";
export class IssuesComponent {
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
        .filteredIssues.map((data) => IssuesTemplate({ data, getContrast }))
        .join(" ");
      this.$el.innerHTML = this.issues;
    }
  }
}
