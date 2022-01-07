export function updateCheckboxStatus(cbElements, urlParams) {
  if (urlParams.get("who")) {
    cbElements.forEach((cb) => {
      cb.value == urlParams.get("who")
        ? (cb.checked = true)
        : (cb.checked = false);
    });
  }
}
