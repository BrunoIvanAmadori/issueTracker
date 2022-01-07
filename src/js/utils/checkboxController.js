import { linkTo } from "./linkTo";

export function initCheckboxController(cbElements) {
  for (let i = 0; i < cbElements.length; i++) {
    cbElements[i].addEventListener("change", (ev) => {
      if (ev.target.checked) {
        // If checkbox is checked, then append query string
        linkTo(`?who=${ev.target.value}`);

        // When checking, uncheck other checkboxes

        cbElements.forEach((checkbox) => {
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
