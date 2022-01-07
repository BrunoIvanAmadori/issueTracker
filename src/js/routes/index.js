import { Home } from "../pages/Home";
import { Header } from "../templates/Header";
import "url-change-event";
import { filterIssuesByUrl } from "../utils/filterIssuesByUrl";
import { updateCheckboxStatus } from "../utils/updateCheckboxStatus";
import { initCheckboxController } from "../utils/checkboxController";

export const router = async (API) => {
  const header = null || document.getElementById("header");
  const content = null || document.getElementById("content");
  const menu = null || document.getElementById("menu");

  async function render(page) {
    if (page == Home) {
      const homeData = await Home(API);

      header.innerHTML = Header();
      content.innerHTML = homeData.issues;
      menu.innerHTML = homeData.menu + homeData.modal;

      const issuesEl = document.querySelectorAll(".issue__card");
      const cbElements = document.querySelectorAll(".memberFilter__checkbox");
      const dropdownMenu = document.querySelector(".dropdown-menu");

      const urlParams = new URLSearchParams(window.location.search);

      filterIssuesByUrl(issuesEl, urlParams, homeData);
      initCheckboxController(cbElements);
      updateCheckboxStatus(cbElements, urlParams);

      window.addEventListener("urlchangeevent", (ev) => {
        const newUrlParams = new URLSearchParams(ev.newURL.search);
        filterIssuesByUrl(issuesEl, newUrlParams, homeData);
      });

      dropdownMenu.addEventListener("click", (ev) => {
        ev.stopPropagation();
      });

      const saveChangesButton = document.querySelector(".saveChanges");
      console.log(saveChangesButton);
      saveChangesButton.addEventListener("click", async () => {
        const criticalPriorityValue = document.getElementById("Critical Priority").value;
        const highPriorityValue = document.getElementById("High Priority").value;
        const midPriorityValue = document.getElementById("Mid Priority").value;
        const lowPriorityValue = document.getElementById("Low Priority").value;
        const veryLowPriorityValue = document.getElementById("Very Low Priority").value;

        const newWeightTables = [
          {
            name: "Critical Priority",
            value: criticalPriorityValue,
          },
          {
            name: "High Priority",
            value: highPriorityValue,
          },
          {
            name: "Mid Priority",
            value: midPriorityValue,
          },
          {
            name: "Low Priority",
            value: lowPriorityValue,
          },
          {
            name: "Very Low Priority",
            value: veryLowPriorityValue,
          },
        ];

        window.sessionStorage.setItem("weightTables", JSON.stringify(newWeightTables));

        console.dir(JSON.parse(window.sessionStorage.getItem("weightTables")));

        const homeData = await Home(API);
        content.innerHTML = homeData.issues;
      });
    }
  }

  render(Home);
};
