import { weightTable } from "./weightTable";

export function getWeightTable() {
  if (window.sessionStorage.getItem("weightTables")) {
    return JSON.parse(window.sessionStorage.getItem("weightTables"));
  } else {
    console.log("no hay weighttable papa");
    return weightTable;
  }
}
