import "url-change-event";
import "./styles/style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Home } from "./pages/Home";
import { createStore } from "redux";
import { reducers } from "./reducers/reducers";
import { defaultWeightTable } from "./utils/defaultWeightTable";

const defaultState = {
  issues: [],
  members: [],
  weightTable: defaultWeightTable
};

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

window.addEventListener("load", async () => {
  console.log("load principal");
  await new Home(store);
});
