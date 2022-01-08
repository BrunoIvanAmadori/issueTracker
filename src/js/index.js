import "url-change-event";
import "./styles/style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Home } from "./pages/Home";
import { createStore } from "redux";
import { default as reducers } from "./reducers/reducers";

const initialState = {
  issues: [],
  members: [],
  weightTable: [
    {
      name: "Critical Priority",
      value: 1000,
    },
    {
      name: "High Priority",
      value: 50,
    },
    {
      name: "Mid Priority",
      value: 20,
    },
    {
      name: "Low Priority",
      value: 10,
    },
    {
      name: "Very Low Priority",
      value: 2,
    },
  ],
};

const store = new createStore(reducers, initialState);

window.addEventListener("load", async () => {
  console.log("load principal");
  await new Home(store);
});
