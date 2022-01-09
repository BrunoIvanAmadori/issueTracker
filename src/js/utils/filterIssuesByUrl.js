/**
 * A function that shows or hides Issues depending on the "?who=" search parameter
 * @param {[HTMLElement]} issues An array of Issue objects.
 * @param {URLSearchParams} urlParams Where the "?who=" should be.
 * @param {{Object}} views Templates in case there are no more issues left.
 */

export function filterIssuesByUrl(issues, url) {
  const urlParams = new URLSearchParams(url);

  if (urlParams.get("who")) {
    return issues.filter((issue) => issue.opener.name == urlParams.get("who"));
  } else {
    return issues;
  }
}

/**
 * A function that listens to url changes and applies Issues filtering
 * @param {[HTMLElement]} issues An array of Issue objects.
 * @param {{Object}} views Templates in case there are no more issues left.
 */
export function addListenerUrlChange(store) {
  window.addEventListener("urlchangeevent", (ev) => {
    store.dispatch({ type: "FILTER_ISSUES", payload: ev.newURL.search });
  });
}
