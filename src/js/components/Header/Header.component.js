import HeaderTemplate from "./Header.template.njk";
import "./Header.style.scss";

export class HeaderComponent {
  constructor(options) {
    this.$el = options.el;

    this.render();
  }

  async render() {
    this.$el.innerHTML = await HeaderTemplate();
  }
}
