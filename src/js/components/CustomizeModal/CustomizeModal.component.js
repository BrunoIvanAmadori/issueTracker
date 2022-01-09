import { defaultWeightTable } from "../../utils/defaultWeightTable";
import CustomizeModalTemplate from "./CustomizeModal.template.njk";

export class CustomizeModalComponent {
  constructor(options) {
    this.$el = options.el;
    this.store = options.store;

    this.defaultWeightTable = defaultWeightTable();

    this.render();
  }

  async render() {
    this.$el.innerHTML = CustomizeModalTemplate({ data: this.store.getState().weightTable });
    this.initComponent();
  }

  initComponent() {
    this.addSaveButtonListener();
    this.addResetButtonListener();
    this.addDismissAlertButtonListener();
    this.addCloseButtonListener();
  }

  addCloseButtonListener() {
    const closeButton = this.$el.querySelector("#closeModalButton");

    closeButton.addEventListener("click", (ev) => {
      this.setFormTo(this.store.getState().weightTable);
    });
  }

  addSaveButtonListener() {
    const saveChangesButton = this.$el.querySelector("[data-action='save-changes']");
    const modal = this.$el.querySelector("#customize-modal");
    const closeButton = this.$el.querySelector("#closeModalButton");

    saveChangesButton.addEventListener("click", async (ev) => {
      let newWeightTable = this.getWeightTableFromForm();
      this.store.dispatch({ type: "UPDATE_ISSUES_SCORE", payload: newWeightTable });

      window.clearTimeout(this.timeout);
      this.showAlert("Done! Weights updated!");
      closeButton.click();
    });
  }

  addResetButtonListener() {
    const resetToDefaultButton = this.$el.querySelector("[data-action='reset-to-default']");

    resetToDefaultButton.addEventListener("click", async (ev) => {
      this.setFormTo(this.defaultWeightTable);
      // this.store.dispatch({ type: "RESET_WEIGHT_TABLE", payload: this.defaultWeightTable });
      // window.clearTimeout(this.timeout);
      // this.showAlert("Done! Weights reseted to default values!");
    });
  }

  addDismissAlertButtonListener() {
    const alertSuccess = this.$el.querySelector("#successCustomize");
    const dismissAlert = this.$el.querySelector("[data-action='close-alert'");

    dismissAlert.addEventListener("click", async (ev) => {
      alertSuccess.classList.remove("show");
    });
  }

  /**
   * Copies the weightTableFromState to a weightTableFromForm updating the values of the form
   * @returns An array based on the form of the modal
   */

  getWeightTableFromForm() {
    let weightTableFromForm = [];
    let weightTableFromState = this.store.getState().weightTable;

    for (let i = 0; i < weightTableFromState.length; i++) {
      weightTableFromForm[i] = weightTableFromState[i];
      weightTableFromForm[i].name = weightTableFromState[i].name;
      weightTableFromForm[i].value = document.getElementById(weightTableFromState[i].name).value;
    }
    return weightTableFromForm;
  }

  /**
   * Sets the form to default values based on the default weight table.
   */

  setFormTo(selectedWeightTable) {
    let weightTable = selectedWeightTable;

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
