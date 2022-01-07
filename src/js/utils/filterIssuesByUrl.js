export function filterIssuesByUrl(issues, urlParams, view) {
  const content = null || document.getElementById("content");
  let issuesVisible = 0;

  if (urlParams.get("who")) {
    issues.forEach((el) => {
      if (el.getAttribute("creator") != urlParams.get("who"))
        el.style.display = "none";
    });
  } else {
    issues.forEach((el) => {
      issuesVisible++;
      el.style.display = "block";
    });
  }

  if (issuesVisible == 0) {
    content.innerHTML = view.error;
  } else {
    content.innerHTML = view.issues;
  }
}
