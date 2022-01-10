import IssueErrorTemplate from "./IssueError.template.njk";
import { linkTo } from "../../utils/linkTo";
import { fadeIn } from "../../animations/animations";

export class IssuesErrorComponent {
  constructor(options) {
    this.$el = options.el;
    this.$el.opacity = 0;
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
      fadeIn(this.$el);

      this.$el.querySelector("[data-action='remove-filters']").addEventListener("click", (ev) => {
        const checkboxElements = document.querySelectorAll(".memberFilter__checkbox");
        Array.from(checkboxElements).map((cb) => (cb.checked = false));
        linkTo("./");
      });
    }
  }
}
