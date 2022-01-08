/**
 * A function to save changes on the weight customization modal.
 */
import { Home } from "../pages/Home";

export function initSaveChangesButton(store) {
  // initSaveChangesButton
  let newWeightTable = [];
  let oldWeightTable = store.getState().weightTable;
  const saveChangesButton = document.querySelector(".saveChanges");
  const alertSuccess = document.getElementById("successCustomize");

  saveChangesButton.addEventListener("click", async (ev) => {
    // We copy the oldWeightTable to a newWeightTable updating the values of the form
    for (let i = 0; i < oldWeightTable.length; i++) {
      newWeightTable[i] = oldWeightTable[i];
      newWeightTable[i].name = oldWeightTable[i].name;
      newWeightTable[i].value = document.getElementById(oldWeightTable[i].name).value;
    }

    store.dispatch({ type: "UPDATE_ISSUES_SCORE", payload: newWeightTable });

    // window.sessionStorage.setItem("weightTables", JSON.stringify(newWeightTable));

    alertSuccess.classList.add("show");
    setTimeout(() => alertSuccess.classList.remove("show"), 2000);
  });
}
