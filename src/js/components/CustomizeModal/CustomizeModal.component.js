import { defaultWeightTable } from "../../utils/defaultWeightTable";
import CustomizeModalTemplate from "./CustomizeModal.template.njk";
import { shake } from "../../animations/animations";
import "./CustomizeModal.style.scss";

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
    const modal = this.$el.querySelector("#customize-modal");

    resetToDefaultButton.addEventListener("click", async (ev) => {
      this.setFormTo(this.defaultWeightTable);
      shake(modal);
      window.clearTimeout(this.timeout);
      this.showAlert("Weights reseted successfully!");
    });
  }

  showAlert(message) {
    const alertSuccess = this.$el.querySelector("#successCustomize");
    const alertMessage = this.$el.querySelector("#alert-message");

    alertMessage.innerHTML = message;

    alertSuccess.classList.add("show");
    this.timeout = window.setTimeout(() => alertSuccess.classList.remove("show"), 2000);
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
}
