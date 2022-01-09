import { defaultWeightTable } from "../utils/defaultWeightTable";
import { createStore } from "redux";
import { reducers } from "../reducers/reducers";

export function configureStore() {
  const defaultState = {
    issues: [],
    members: [],
    weightTable: defaultWeightTable(),
  };

  // function getInitialState() {
  //   if (sessionStorage.getItem("State")) {
  //     return JSON.parse(sessionStorage.getItem("State"));
  //   } else {
  //     return defaultState;
  //   }
  // }

  const store = new createStore(reducers, defaultState);

  // store.subscribe(() => {
  //   sessionStorage.setItem("State", JSON.stringify(store.getState()));
  // });

  return store;
}
