import "url-change-event";
import "./styles/style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Home } from "./pages/Home";

const state = {
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

window.addEventListener("load", async () => {
  console.log("load principal");
  await new Home(state);
});
