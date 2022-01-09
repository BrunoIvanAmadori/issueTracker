import "url-change-event";
import "./styles/style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Home } from "./pages/Home";
import { configureStore } from "./store/store";

const store = configureStore();

window.addEventListener("load", async () => {
  console.log("load principal");
  await new Home(store);
});
