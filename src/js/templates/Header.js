import RotundaLogo from "../../img/rotunda-logo.png";
import GithubLogo from "../../img/github-logo.png";

export const Header = () => {
  const view = `
  <div class="header__main">
    <div class="header__github col-12 col-md-6 justify-content-center justify-content-md-start">
        <img class="header__github-logo" src=${GithubLogo}>
        <h2 class="header__github-title">Github Issue Tracker</h2>
    </div>
    
    <div class="header__rotunda col-12 col-md-6 justify-content-center justify-content-md-end">
        <img class="header__rotunda-logo" src=${RotundaLogo}>
    </div>
  </div>
  `;
  return view;
};
