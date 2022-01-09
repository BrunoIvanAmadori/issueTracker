import { Issue } from "../templates/Issue";
import { Menu } from "../templates/Menu";
import { Header } from "../templates/Header";
import { IssueError } from "../templates/IssueError";
import { CustomizeModal as $CustomizeModal } from "../templates/CustomizeModalTemplate";

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
import { CustomizeModal } from "../components/CustomizeModal";
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

    addListenerUrlChange(store);

    await this.renderPage(store);

    this.injectFunctionality(store);
  }

  async getData() {
    // we fetch the issues and members data from GitHUb
    const API = new GitHubAPI(APIConfig);
    const issues = await API.IssuesController.getAllIssues();
    const members = await API.MembersController.getAllMembers();

    return { issues, members };
  }

  async renderPage(store) {
    store.subscribe(() => this.renderIssues(store));

    await this.renderMenu(store);
    const modalComponent = new CustomizeModal({ el: document.getElementById("modal"), store: store });
    await this.renderModal(store);
    this.renderIssues(store);
    this.renderHeader();

    const error = await IssueError();
  }

  renderIssues(store) {
    const issues = store
      .getState()
      .filteredIssues.map((issue) => Issue(issue))
      .join(" ");
    const contentSection = null || document.getElementById("content");
    contentSection.innerHTML = issues;
  }

  async renderModal(store) {
    // const modal = await CustomizeModal(store.getState().weightTable);
    // const modalSection = null || document.getElementById("modal");
    // modalSection.innerHTML = modal;
  }

  renderHeader() {
    const header = Header();
    const headerSection = null || document.getElementById("header");
    headerSection.innerHTML = header;
  }

  async renderMenu(store) {
    const menu = await Menu(store.getState().members);
    const menuSection = null || document.getElementById("menu");
    menuSection.innerHTML = menu;
  }

  injectFunctionality(store) {
    const urlParams = new URLSearchParams(window.location.search);
    const checkboxElements = document.querySelectorAll(".memberFilter__checkbox");

    // initCheckbox(checkboxElements, urlParams);
    // initDropdownMenu();
    // initSaveChangesButton(store);
  }
}
