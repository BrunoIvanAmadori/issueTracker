import { Modal } from "bootstrap";
import { CustomizeModalTemplate } from "../templates/CustomizeModalTemplate";
import { defaultWeightTable } from "../utils/defaultWeightTable";

export class CustomizeModal {
  constructor(options) {
    this.$el = options.el;
    this.store = options.store;
    // this.store.subscribe(this.update.bind(this));
    this.defaultWeightTable = defaultWeightTable();

    this.render();
  }

  async render() {
    this.$el.innerHTML = await CustomizeModalTemplate(this.store.getState().weightTable);
    this.initComponent();
  }

  initComponent() {
    const saveChangesButton = this.$el.querySelector(".saveChanges");
    const resetToDefaultButton = this.$el.querySelector(".resetToDefault");

    saveChangesButton.addEventListener("click", async (ev) => {
      let newWeightTable = this.getWeightTableFromForm();

      this.store.dispatch({ type: "UPDATE_ISSUES_SCORE", payload: newWeightTable });
      this.showAlert("Done! Weights updated!");
      console.log("Done! Weights updated!");
    });

    resetToDefaultButton.addEventListener("click", async (ev) => {
      this.postWeightTableToForm();
      this.store.dispatch({ type: "RESET_WEIGHT_TABLE", payload: this.defaultWeightTable });

      this.showAlert("Done! Weights reseted to default values!");
    });
  }

  update() {
    // console.log("onupdate : ", this.store.getState());
  }

  getWeightTableFromForm() {
    // initSaveChangesButton
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
    // initSaveChangesButton
    let weightTable = this.defaultWeightTable;

    console.log("weightTable del store: ", weightTable);

    for (let i = 0; i < weightTable.length; i++) {
      document.getElementById(weightTable[i].name).value = weightTable[i].value;
    }
  }

  showAlert(message) {
    const alertSuccess = this.$el.querySelector("#successCustomize");
    const alertMessage = this.$el.querySelector("#alert-message");
    alertMessage.innerHTML = message;

    alertSuccess.classList.add("show");
    setTimeout(() => alertSuccess.classList.remove("show"), 2000);
  }
}
