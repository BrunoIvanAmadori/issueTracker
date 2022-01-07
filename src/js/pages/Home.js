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

/**
 * The main class for the Homepage
 */
export class Home {
  constructor() {
    this.data;
    this.views;
  }

  static async init() {
    this.data = await this.getData();
    this.views = await this.getViews(this.data);
    this.renderHTML(this.views);
    this.injectFunctionality(this.views);
  }

  static async getData() {
    // we fetch the issues and members data from GitHUb
    const API = new GitHubAPI(APIConfig);
    const issues = await API.IssuesController.getAllIssues();
    const members = await API.MembersController.getAllMembers();

    return { issues, members };
  }

  static async getViews(data) {
    // we inject the data into the templates
    const header = Header();
    const issues = data.issues.map((issue) => Issue(issue)).join(" ");
    const menu = await Menu(data.members);
    const modal = await CustomizeModal(weightTable);
    const error = await IssueError();

    return { header, issues, menu, modal, error };
  }

  static renderHTML(views) {
    // we obtain the main placeholders for our content and render
    const headerSection = null || document.getElementById("header");
    const contentSection = null || document.getElementById("content");
    const menuSection = null || document.getElementById("menu");

    headerSection.innerHTML = views.header;
    contentSection.innerHTML = views.issues;
    menuSection.innerHTML = views.menu + views.modal;
  }

  static injectFunctionality(views) {
    // We start providing functionality to the dom

    const issuesElements = document.querySelectorAll(".issue__card");
    const checkboxElements = document.querySelectorAll(".memberFilter__checkbox");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const urlParams = new URLSearchParams(window.location.search);

    filterIssuesByUrl(issuesElements, urlParams, views);
    initCheckbox(checkboxElements, urlParams);
    initDropdownMenu(dropdownMenu);
    initSaveChangesButton(weightTable);
    addListenerUrlChange(issuesElements, views);
  }

  static async update() {
    const issuesElements = document.querySelectorAll(".issue__card");
    const urlParams = new URLSearchParams(window.location.search);

    this.data = await this.getData();
    this.views = await this.getViews(this.data);
    const contentSection = null || document.getElementById("content");
    contentSection.innerHTML = this.views.issues;
    filterIssuesByUrl(issuesElements, urlParams, this.views);
  }
}
