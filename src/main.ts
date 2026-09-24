import "./styles/app.css";
import { AppController } from "./controllers/AppController";
import { AppModel } from "./models/AppModel";
import { AppView } from "./views/AppView";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("找不到應用程式根節點 #app");
}

const app = new AppController(new AppModel(), new AppView(root));
app.start();
