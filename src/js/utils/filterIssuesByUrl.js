/**
 * A function that shows or hides Issues depending on the "?who=" search parameter
 * @param {[HTMLElement]} issues An array of Issue objects.
 * @param {URLSearchParams} urlParams Where the "?who=" should be.
 * @param {{Object}} views Templates in case there are no more issues left.
 */

import { Home } from "../pages/Home";

export function filterIssuesByUrl(urlParams, state) {
  let issuesVisible = 0;

  if (urlParams.get("who")) {
    state = { ...state, issues: state.issues.filter((issue) => issue.opener.name == urlParams.get("who")) };
  }

  return state;
}

/**
 * A function that listens to url changes and applies Issues filtering
 * @param {[HTMLElement]} issues An array of Issue objects.
 * @param {{Object}} views Templates in case there are no more issues left.
 */
export function addListenerUrlChange(state) {
  window.addEventListener("urlchangeevent", (ev) => {
    const newUrlParams = new URLSearchParams(ev.newURL.search);
    const newState = filterIssuesByUrl(newUrlParams, state);

    const updateStateEvent = new CustomEvent("updateStateEvent", { detail: newState });
    document.dispatchEvent(updateStateEvent);
  });
}
