import { MenuComponent } from "../components/Menu/Menu.component";
import { HeaderComponent } from "../components/Header/Header.component";
import { CustomizeModalComponent } from "../components/CustomizeModal/CustomizeModal.component";
import { IssuesComponent } from "../components/Issues/Issues.component";
import { IssuesErrorComponent } from "../components/IssuesError/IssuesError.component";

import { config } from "../api/config";
import { GitHubAPI } from "../api/GitHubAPI";

/**
 * The main class for the Homepage
 */

export class Home {
  constructor(store) {
    this.init(store);
  }

  async init(store) {
    this.data = await this.getData();

    // We prepare the data for view shooting the following events
    store.dispatch({ type: "CREATE_ISSUES", payload: this.data.issues });
    store.dispatch({ type: "FILTER_ISSUES", payload: window.location.search });
    store.dispatch({ type: "CREATE_MEMBERS", payload: this.data.members });

    this.filterOnURLChange(store);

    await this.render(store);
  }

  /**
   * This function fetches the issues and members data from GitHUb
   * @returns Object with issues and members
   */

  async getData() {
    const API = new GitHubAPI(config);
    const issues = await API.IssuesController.getAllIssues();
    const members = await API.MembersController.getAllMembers();

    return { issues, members };
  }

  /**
   * This function initializes all the components, all with their own render logics
   * @param {Object} store
   */

  async render(store) {
    new HeaderComponent({ el: null || document.getElementById("header") });
    new MenuComponent({ el: null || document.getElementById("menu"), store });
    new CustomizeModalComponent({ el: null || document.getElementById("modal"), store });
    new IssuesComponent({ el: null || document.getElementById("content"), store });
    new IssuesErrorComponent({ el: null || document.getElementById("content"), store });
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
