import MenuTemplate from "./Menu.template.njk";
import { linkTo } from "../../utils/linkTo";
import "./Menu.style.scss";

export class MenuComponent {
  constructor(options) {
    this.$el = options.el;
    this.store = options.store;

    this.render();
  }

  async render() {
    this.$el.innerHTML = MenuTemplate({ members: this.store.getState().members });
    this.initComponent();
  }

  initComponent() {
    this.initCheckbox();
    this.initDropdownMenu();
  }
  /**
   * A function to init the checkbox logic on the members filter
   */
  initCheckbox() {
    const urlParams = new URLSearchParams(window.location.search);
    const checkboxElements = document.querySelectorAll(".memberFilter__checkbox");

    if (urlParams.get("who")) {
      checkboxElements.forEach((checkbox) => {
        checkbox.value == urlParams.get("who") ? (checkbox.checked = true) : (checkbox.checked = false);
      });
    }

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
