import { CustomizeModalTemplate } from "./CustomizeModalTemplate";
import { defaultWeightTable } from "../../utils/defaultWeightTable";

export class CustomizeModal {
  constructor(options) {
    this.$el = options.el;
    this.store = options.store;

    this.defaultWeightTable = defaultWeightTable();

    this.render();
  }

  async render() {
    this.$el.innerHTML = await CustomizeModalTemplate(this.store.getState().weightTable);
    this.initComponent();
  }

  initComponent() {
    const alertSuccess = this.$el.querySelector("#successCustomize");
    const saveChangesButton = this.$el.querySelector("[data-action='save-changes']");
    const resetToDefaultButton = this.$el.querySelector("[data-action='reset-to-default']");
    const dismissAlert = this.$el.querySelector("[data-action='close-alert'");

    saveChangesButton.addEventListener("click", async (ev) => {
      let newWeightTable = this.getWeightTableFromForm();
      this.store.dispatch({ type: "UPDATE_ISSUES_SCORE", payload: newWeightTable });

      window.clearTimeout(this.timeout);
      this.showAlert("Done! Weights updated!");
    });

    resetToDefaultButton.addEventListener("click", async (ev) => {
      this.postWeightTableToForm();
      this.store.dispatch({ type: "RESET_WEIGHT_TABLE", payload: this.defaultWeightTable });
      window.clearTimeout(this.timeout);
      this.showAlert("Done! Weights reseted to default values!");
    });

    dismissAlert.addEventListener("click", async (ev) => {
      alertSuccess.classList.remove("show");
    });
  }

  getWeightTableFromForm() {
    let weightTableFromForm = [];
    let weightTableFromState = this.store.getState().weightTable;

    // We copy the weightTableFromState to a weightTableFromForm updating the values of the form
    for (let i = 0; i < weightTableFromState.length; i++) {
      weightTableFromForm[i] = weightTableFromState[i];
      weightTableFromForm[i].name = weightTableFromState[i].name;
      weightTableFromForm[i].value = document.getElementById(weightTableFromState[i].name).value;
    }
    return weightTableFromForm;
  }

  postWeightTableToForm() {
    let weightTable = this.defaultWeightTable;

    for (let i = 0; i < weightTable.length; i++) {
      document.getElementById(weightTable[i].name).value = weightTable[i].value;
    }
  }

  showAlert(message) {
    const alertSuccess = this.$el.querySelector("#successCustomize");
    const alertMessage = this.$el.querySelector("#alert-message");

    alertMessage.innerHTML = message;

    alertSuccess.classList.add("show");
    this.timeout = window.setTimeout(() => alertSuccess.classList.remove("show"), 2000);
  }
}
