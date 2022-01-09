import { MenuTemplate } from "../templates/MenuTemplate";
import { linkTo } from "../utils/linkTo";

export class Menu {
  constructor(options) {
    this.$el = options.el;
    this.store = options.store;

    this.render();
  }

  async render() {
    this.$el.innerHTML = await MenuTemplate(this.store.getState().members);
    this.initComponent();
  }

  initComponent() {
    this.initCheckbox();
    this.initDropdownMenu();
  }
  /**
   * A function to init the checkbox logic on the members filter
   * @param {[HTMLElement]} checkboxElements Checkboxes to lookup.
   * @param {URLSearchParams} URLSearchParams URLSearchParams object to check.
   */
  initCheckbox() {
    const urlParams = new URLSearchParams(window.location.search);
    const checkboxElements = document.querySelectorAll(".memberFilter__checkbox");

    for (let i = 0; i < checkboxElements.length; i++) {
      checkboxElements[i].addEventListener("change", (ev) => {
        if (ev.target.checked) {
          // If checkbox is checked, then append query string
          linkTo(`?who=${ev.target.value}`);

          // When checking, uncheck other checkboxes
          checkboxElements.forEach((checkbox) => {
            if (checkbox.value != ev.target.value) {
              checkbox.checked = false;
            }
          });
        } else {
          linkTo("/");
        }
      });
    }
    if (urlParams.get("who")) {
      checkboxElements.forEach((checkbox) => {
        checkbox.value == urlParams.get("who") ? (checkbox.checked = true) : (checkbox.checked = false);
      });
    }
  }

  /**
   * A simple function to prevent the dropdown menu from closing on click
   */
  initDropdownMenu() {
    const dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu.addEventListener("click", (ev) => {
      ev.stopPropagation();
    });
  }
}
