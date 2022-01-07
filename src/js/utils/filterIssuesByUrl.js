/**
 * A function that shows or hides Issues depending on the "?who=" search parameter
 * @param {[HTMLElement]} issues An array of Issue objects.
 * @param {URLSearchParams} urlParams Where the "?who=" should be.
 * @param {{Object}} views Templates in case there are no more issues left.
 */

import { Home } from "../pages/Home";

export function filterIssuesByUrl(issues, urlParams, views) {
  const content = null || document.getElementById("content");

  let issuesVisible = 0;

  if (urlParams.get("who")) {
    issues.forEach((el) => {
      if (el.getAttribute("creator") != urlParams.get("who")) {
        el.style.visibility = "hidden";
      }
    });
  } else {
    issues.forEach((el) => {
      issuesVisible++;
      el.style.visibility = "visible";
    });
  }

  if (issuesVisible == 0) {
    content.innerHTML = views.error;
  } else {
    content.innerHTML = views.issues;
  }
}

/**
 * A function that listens to url changes and applies Issues filtering
 * @param {[HTMLElement]} issues An array of Issue objects.
 * @param {{Object}} views Templates in case there are no more issues left.
 */
export function addListenerUrlChange(issues, views) {
  window.addEventListener("urlchangeevent", (ev) => {
    const newUrlParams = new URLSearchParams(ev.newURL.search);
    filterIssuesByUrl(issues, newUrlParams, views);
  });
}
