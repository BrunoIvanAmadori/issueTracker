export function getVisibleIssues(issues) {
    
  let issuesVisible = 0;

  issues.forEach((el) => {
    if (el.style.display == "block") {
      console.log("block");
      issuesVisible++;
    }
  });

  return issuesVisible;
}
