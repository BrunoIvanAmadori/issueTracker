import { linkTo } from "./linkTo";

/**
 * A function to init the checkbox logic on the members filter
 * @param {[HTMLElement]} checkboxElements Checkboxes to lookup.
 */
export function initCheckbox(checkboxElements, urlParams) {
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
 * This checks if there is already a "who" parameter on url and updates checkbox values accordingly.
 * @param {[HTMLElement]} checkboxElements Checkboxes to lookup.
 */
export function updateCheckbox(checkboxElements, urlParams) {
  if (urlParams.get("who")) {
    checkboxElements.forEach((checkbox) => {
      checkbox.value == urlParams.get("who") ? (checkbox.checked = true) : (checkbox.checked = false);
    });
  }
}
