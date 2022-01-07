export function linkTo(url) {
  window.history.replaceState({}, "", url);
}
