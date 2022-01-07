/**
 * A simple function to prevent the dropdown menu from closing on click
 */
export function initDropdownMenu() {
  const dropdownMenu = document.querySelector(".dropdown-menu");

  dropdownMenu.addEventListener("click", (ev) => {
    ev.stopPropagation();
  });
}
