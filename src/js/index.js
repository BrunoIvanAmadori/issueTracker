import "url-change-event";
import "./styles/shared.style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Home } from "./pages/Home";
import { configureStore } from "./store/store";

const store = configureStore();

const config = {
  token: process.env.TOKEN,
  repo: "rotundasoftware",
  project: "rotunda-qa-demo",
  org: "rotundasoftware",
};

window.addEventListener("load", async () => {
  await new Home(store, config);
});
