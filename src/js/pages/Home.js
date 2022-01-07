import { Issue } from "../templates/Issue";
import { Menu } from "../templates/Menu";
import { Header } from "../templates/Header";
import { IssueError } from "../templates/IssueError";
import { CustomizeModal } from "../templates/CustomizeModal";

import { addListenerUrlChange, filterIssuesByUrl } from "../utils/filterIssuesByUrl";
import { initCheckbox, updateCheckbox } from "../utils/initCheckbox";
import { initSaveChangesButton } from "../utils/initSaveChangesButton";
import { weightTable } from "../api/utils/weightTable";
import { linkTo } from "../utils/linkTo";

import { APIConfig } from "../api/APIConfig";
import { GitHubAPI } from "../api/GitHubAPI";
import { initDropdownMenu } from "../utils/initDropdownMenu";
import { countBusinessDays } from "../api/utils/countBusinessDays";
import { getScore } from "../api/utils/getScore";
import { sortAsc } from "../api/utils/sortAsc";

/**
 * The main class for the Homepage
 */

export class Home {
  constructor(state) {
    this.state = state;

    this.init();
  }

  async init() {
    this.data = await this.getData();
    this.state.issues = this.data.issues;
    this.state.members = this.data.members;

    document.addEventListener("updateStateEvent", (ev) => {
      this.setState(() => {
        console.log("is happnenig");
        this.state = ev.detail;
        console.log(this.state);
      }, "issues");
    });

    await this.renderHTML(this.state);

    this.injectFunctionality();
  }

  async getData() {
    // we fetch the issues and members data from GitHUb
    const API = new GitHubAPI(APIConfig);
    const issues = await API.IssuesController.getAllIssues();
    const members = await API.MembersController.getAllMembers();

    return { issues, members };
  }

  async renderHTML(option) {
    this.updateScore();
    // we inject the data into the templates
    const header = Header();
    const menu = await Menu(this.state.members);
    const modal = await CustomizeModal(weightTable);
    const error = await IssueError();
    const issues = this.state.issues.map((issue) => Issue(issue)).join(" ");

    // we obtain the main placeholders for our content and render
    const headerSection = null || document.getElementById("header");
    const contentSection = null || document.getElementById("content");
    const menuSection = null || document.getElementById("menu");

    if (option == "issues") {
      contentSection.innerHTML = issues;
    } else {
      headerSection.innerHTML = header;
      contentSection.innerHTML = issues;
      menuSection.innerHTML = menu + modal;
    }
  }

  injectFunctionality() {
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const urlParams = new URLSearchParams(window.location.search);
    const checkboxElements = document.querySelectorAll(".memberFilter__checkbox");

    this.setState(() => {
      this.state = filterIssuesByUrl(urlParams, this.state);
      console.log(this.state);
    }, "issues");

    initCheckbox(checkboxElements, urlParams);
    initDropdownMenu();
    initSaveChangesButton(this.state);
    addListenerUrlChange(this.state);
  }

  async setState(cb, elToRender) {
    cb();
    await this.renderHTML(elToRender);
  }

  updateScore() {
    this.state.issues.map((issue) => {
      const today = new Date();
      const creationDate = new Date(issue.created_at);
      const totalBusinessDays = countBusinessDays(creationDate, today);
      const score = getScore(this.state.weightTable, issue.labels, totalBusinessDays);
      issue.score = score;
    });
    this.state.issues = sortAsc(this.state.issues, ["score", "created_at"]);
  }
}
