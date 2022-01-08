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
import { updateScore } from "../api/utils/updateScore";

/**
 * The main class for the Homepage
 */

export class Home {
  constructor(store) {
    // store.subscribe(() => {
    //   this.state = store.getState();
    // });

    this.init(store);
  }

  async init(store) {
    // Then, we map the data to props

    // First we fetch
    this.data = await this.getData();

    store.dispatch({ type: "CREATE_ISSUES", payload: this.data.issues });
    store.dispatch({ type: "FILTER_ISSUES", payload: window.location.search });
    store.dispatch({ type: "CREATE_MEMBERS", payload: this.data.members });

    console.log(store.getState());

    // this.state.issues = this.data.issues;
    // this.state.members = this.data.members;

    // this.state = filterIssuesByUrl(this.state);
    // updateScore(this.state);
    // this.state = sortAsc(this.state, ["created_at", "score"]);

    document.addEventListener("updateStateEvent", async (ev) => {
      // this.state = ev.detail;
      // updateScore(this.state);
      // await this.renderHTML("issues");
    });

    addListenerUrlChange(store);

    await this.renderHTML(store);
    store.subscribe(() => this.updateHTML(store.getState()));

    this.injectFunctionality(store);
  }

  async getData() {
    // we fetch the issues and members data from GitHUb
    const API = new GitHubAPI(APIConfig);
    const issues = await API.IssuesController.getAllIssues();
    const members = await API.MembersController.getAllMembers();

    return { issues, members };
  }

  async renderHTML(store) {
    // we inject the data into the templates
    const members = store.getState().members;

    const header = Header();
    const menu = await Menu(members);
    const modal = await CustomizeModal(store);
    const error = await IssueError();
    const issues = store
      .getState()
      .filteredIssues.map((issue) => Issue(issue))
      .join(" ");

    // we obtain the main placeholders for our content and render
    const headerSection = null || document.getElementById("header");
    const contentSection = null || document.getElementById("content");
    const menuSection = null || document.getElementById("menu");

    headerSection.innerHTML = header;
    menuSection.innerHTML = menu + modal;
    contentSection.innerHTML = issues;
  }

  updateHTML(state) {
    const issues = state.filteredIssues.map((issue) => Issue(issue)).join(" ");

    const contentSection = null || document.getElementById("content");

    contentSection.innerHTML = issues;
  }

  injectFunctionality(store) {
    const urlParams = new URLSearchParams(window.location.search);
    const checkboxElements = document.querySelectorAll(".memberFilter__checkbox");

    initCheckbox(checkboxElements, urlParams);
    initDropdownMenu();
    initSaveChangesButton(store);
  }

  async setState(cb, elToRender) {
    cb();
    await this.renderHTML(elToRender);
  }
}
