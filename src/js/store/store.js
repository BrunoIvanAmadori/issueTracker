import { defaultWeightTable } from "../utils/defaultWeightTable";
import { createStore } from "redux";
import { reducers } from "../reducers/reducers";

export function configureStore() {
  const defaultState = {
    issues: [],
    members: [],
    weightTable: defaultWeightTable(),
  };

  /**
   * This function detects if there is a state saved on sessionStorage and loads it
   * @returns 
   */

  function getInitialState() {
    if (sessionStorage.getItem("State")) {
      return JSON.parse(sessionStorage.getItem("State"));
    } else {
      return defaultState;
    }
  }

  const store = new createStore(reducers, getInitialState());

  store.subscribe(() => {
    sessionStorage.setItem("State", JSON.stringify(store.getState()));
  });

  return store;
}
