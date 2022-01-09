import { Menu } from "../components/Menu";
import { Header } from "../components/Header";
import { CustomizeModal } from "../components/CustomizeModal";
import { Issues } from "../components/Issues";
import { IssuesError } from "../components/IssuesError";

import { APIConfig } from "../api/APIConfig";
import { GitHubAPI } from "../api/GitHubAPI";

/**
 * The main class for the Homepage
 */

export class Home {
  constructor(store) {
    this.init(store);
  }

  async init(store) {
    // Then, we map the data to props

    // First we fetch
    this.data = await this.getData();

    store.dispatch({ type: "CREATE_ISSUES", payload: this.data.issues });
    store.dispatch({ type: "FILTER_ISSUES", payload: window.location.search });
    store.dispatch({ type: "CREATE_MEMBERS", payload: this.data.members });

    this.filterOnURLChange(store);

    await this.render(store);
  }

  async getData() {
    // we fetch the issues and members data from GitHUb
    const API = new GitHubAPI(APIConfig);
    const issues = await API.IssuesController.getAllIssues();
    const members = await API.MembersController.getAllMembers();

    return { issues, members };
  }

  async render(store) {
    new Header({ el: null || document.getElementById("header") });
    new Menu({ el: null || document.getElementById("menu"), store });
    new CustomizeModal({ el: null || document.getElementById("modal"), store });
    new Issues({ el: null || document.getElementById("content"), store });
    new IssuesError({ el: null || document.getElementById("content"), store });
  }

  /**
   * A function that listens to url changes and applies Issues filtering
   * @param {[HTMLElement]} issues An array of Issue objects.
   * @param {{Object}} views Templates in case there are no more issues left.
   */

  filterOnURLChange(store) {
    window.addEventListener("urlchangeevent", (ev) => {
      store.dispatch({ type: "FILTER_ISSUES", payload: ev.newURL.search });
    });
  }
}
