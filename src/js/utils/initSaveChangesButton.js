/**
 * A function to save changes on the weight customization modal.
 */
import { Home } from "../pages/Home";

export function initSaveChangesButton(state) {
  // initSaveChangesButton
  let newWeightTable = [];
  let oldWeightTable = state.weightTable;
  const saveChangesButton = document.querySelector(".saveChanges");
  const alertSuccess = document.getElementById("successCustomize");

  saveChangesButton.addEventListener("click", async (ev) => {
    for (let i = 0; i < oldWeightTable.length; i++) {
      newWeightTable[i] = oldWeightTable[i];
      newWeightTable[i].name = oldWeightTable[i].name;
      newWeightTable[i].value = document.getElementById(oldWeightTable[i].name).value;
    }

    const newState = { ...state, weightTable: newWeightTable };

    // window.sessionStorage.setItem("weightTables", JSON.stringify(newWeightTable));

    alertSuccess.classList.add("show");
    setTimeout(() => alertSuccess.classList.remove("show"), 2000);

    const updateStateEvent = new CustomEvent("updateStateEvent", { detail: newState });
    document.dispatchEvent(updateStateEvent);
  });
}
