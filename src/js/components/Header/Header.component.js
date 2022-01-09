import HeaderTemplate from "./Header.template.njk";

export class HeaderComponent {
  constructor(options) {
    this.$el = options.el;

    this.render();
  }

  async render() {
    this.$el.innerHTML = await HeaderTemplate();
  }
}
