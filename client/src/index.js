import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserStore from "./store/UserStore.js";
import TodosStore from "./store/TodosStore.js";

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      todos: new TodosStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
