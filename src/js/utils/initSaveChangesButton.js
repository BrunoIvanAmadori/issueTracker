/**
 * A function to save changes on the weight customization modal.
 */
import { Home } from "../pages/Home";

export function initSaveChangesButton(defaultWeightTable) {
  // initSaveChangesButton
  let newWeightTable = [];
  const saveChangesButton = document.querySelector(".saveChanges");
  const alertSuccess = document.getElementById("successCustomize");

  saveChangesButton.addEventListener("click", async (ev) => {
    for (let i = 0; i < defaultWeightTable.length; i++) {
      newWeightTable[i] = defaultWeightTable[i];
      newWeightTable[i].name = defaultWeightTable[i].name;
      newWeightTable[i].value = document.getElementById(defaultWeightTable[i].name).value;
    }

    window.sessionStorage.setItem("weightTables", JSON.stringify(newWeightTable));

    await Home.update();

    alertSuccess.classList.add("show");
    setTimeout(() => alertSuccess.classList.remove("show"), 2000);
  });
}
