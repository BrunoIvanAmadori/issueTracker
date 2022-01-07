/**
 * A simple function to update url without refreshing the navigator
 * @param {*} url
 */
export function linkTo(url) {
  window.history.replaceState({}, "", url);
}
