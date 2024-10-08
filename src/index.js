import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { ContextQuiz } from "./context/contextQuiz";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextQuiz>
      <App />
    </ContextQuiz>
  </React.StrictMode>
);
