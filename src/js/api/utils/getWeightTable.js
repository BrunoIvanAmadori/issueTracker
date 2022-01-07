/**
 * Function that checks if there is a saved weight table on sessionStorage and, if not, uses default
 */

import { weightTable } from "./weightTable";

export function getWeightTable() {
  if (window.sessionStorage.getItem("weightTables")) {
    return JSON.parse(window.sessionStorage.getItem("weightTables"));
  } else {
    return weightTable;
  }
}
