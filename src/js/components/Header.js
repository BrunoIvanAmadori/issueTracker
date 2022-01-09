import { HeaderTemplate } from "../templates/HeaderTemplate";

export class Header {
  constructor(options) {
    this.$el = options.el;

    this.render();
  }

  async render() {
    this.$el.innerHTML = await HeaderTemplate();
  }
}
