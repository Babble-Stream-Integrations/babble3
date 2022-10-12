import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";

initializeApp(config.firebaseConfig);
ReactDOM.render(
  // <React.StrictMode>

  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
