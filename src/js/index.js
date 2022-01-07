import "url-change-event";
import "./styles/style.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Home } from "./pages/Home";

window.addEventListener("load", async () => {
  Home.init();
});
